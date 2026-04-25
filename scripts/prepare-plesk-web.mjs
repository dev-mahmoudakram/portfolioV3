import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const webDir = path.join(rootDir, "apps", "web");
const typesDir = path.join(rootDir, "packages", "types");
const distDirName = `.next-plesk-${Date.now()}`;
const nextDistDir = path.join(webDir, distDirName);
const standaloneDir = path.join(nextDistDir, "standalone");
const deployDir = path.join(rootDir, "deploy-output", "plesk", "web");
const webTsconfigPath = path.join(webDir, "tsconfig.json");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function findServerEntry(baseDir) {
  const rootServer = path.join(baseDir, "server.js");
  if (await exists(rootServer)) {
    return { mode: "root", serverPath: rootServer };
  }

  const nestedServer = path.join(baseDir, "apps", "web", "server.js");
  if (await exists(nestedServer)) {
    return { mode: "nested", serverPath: nestedServer };
  }

  throw new Error("Unable to find Next.js standalone server entry.");
}

async function writeJson(targetPath, value) {
  await writeFile(targetPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  const originalTsconfig = await readFile(webTsconfigPath, "utf8");

  await rm(deployDir, { recursive: true, force: true });

  try {
    run("npm", ["--workspaces=false", "--prefix", typesDir, "run", "build"]);
    run("npm", ["--workspaces=false", "--prefix", webDir, "run", "build"], {
      env: {
        ...process.env,
        NEXT_DIST_DIR: distDirName
      }
    });

    const entry = await findServerEntry(standaloneDir);
    await mkdir(deployDir, { recursive: true });
    await cp(standaloneDir, deployDir, { recursive: true });

    let prismaSchemaPath = "prisma/schema.prisma";

    if (entry.mode === "root") {
      await mkdir(path.join(deployDir, ".next"), { recursive: true });
      await cp(path.join(nextDistDir, "static"), path.join(deployDir, ".next", "static"), {
        recursive: true
      });
      await cp(path.join(webDir, "public"), path.join(deployDir, "public"), { recursive: true });
      await cp(path.join(webDir, "prisma"), path.join(deployDir, "prisma"), { recursive: true });
      await writeFile(
        path.join(deployDir, "app.js"),
        'process.chdir(__dirname);\nrequire("./server.js");\n',
        "utf8"
      );
    } else {
      const nestedAppDir = path.join(deployDir, "apps", "web");
      prismaSchemaPath = "apps/web/prisma/schema.prisma";
      await mkdir(path.join(nestedAppDir, ".next"), { recursive: true });
      await cp(path.join(nextDistDir, "static"), path.join(nestedAppDir, ".next", "static"), {
        recursive: true
      });
      await cp(path.join(webDir, "public"), path.join(nestedAppDir, "public"), { recursive: true });
      await cp(path.join(webDir, "prisma"), path.join(nestedAppDir, "prisma"), { recursive: true });
      await writeFile(
        path.join(deployDir, "app.js"),
        'process.chdir(__dirname + "/apps/web");\nrequire("./apps/web/server.js");\n',
        "utf8"
      );
    }

    const packageJson = JSON.parse(await readFile(path.join(webDir, "package.json"), "utf8"));
    await writeJson(path.join(deployDir, "package.json"), {
      name: "mahmoud-portfolio-web-plesk",
      private: true,
      version: packageJson.version,
      scripts: {
        start: "node app.js",
        "prisma:generate": `prisma generate --schema ${prismaSchemaPath}`,
        "prisma:migrate:deploy": `prisma migrate deploy --schema ${prismaSchemaPath}`
      },
      dependencies: {
        "@prisma/client": packageJson.dependencies["@prisma/client"],
        prisma: packageJson.devDependencies.prisma
      },
      engines: {
        node: ">=18"
      }
    });

    await writeFile(
      path.join(deployDir, ".env.example"),
      'NODE_ENV="production"\nDATABASE_URL="mysql://DB_USER:DB_PASS@localhost:3306/mahmoud_portfolio"\nNEXT_PUBLIC_SITE_URL="https://mahmoud-akram.duckdns.org"\nNEXT_PUBLIC_API_URL="/api"\nPORT=3000\nHOSTNAME="0.0.0.0"\n',
      "utf8"
    );

    const deployNotes = [
      "Plesk Single-App Web Deployment",
      "",
      "Upload the contents of this folder to the domain application root.",
      entry.mode === "nested"
        ? "After upload, set Document Root to apps/web/public"
        : "After upload, set Document Root to public",
      "Application Startup File: app.js",
      "",
      "Optional after upload:",
      "1. NPM install",
      "2. Run script: prisma:generate",
      "3. Run script: prisma:migrate:deploy",
      "4. Restart App"
    ].join("\n");

    await writeFile(path.join(deployDir, "DEPLOY.txt"), `${deployNotes}\n`, "utf8");
  } finally {
    await writeFile(webTsconfigPath, originalTsconfig, "utf8");
    await rm(nextDistDir, { recursive: true, force: true }).catch(() => {
      // Ignore cleanup failures from transient file locks on Windows.
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
