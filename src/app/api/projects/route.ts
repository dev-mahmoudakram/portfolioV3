import { NextRequest, NextResponse } from "next/server";
import { createProject, listProjects } from "@/server/portfolio-data";
import { isAdminAuthorizedFromRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function parseProjectPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload." };
  }

  const data = payload as Record<string, unknown>;
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const categories = Array.isArray(data.categories)
    ? data.categories.map((item) => String(item).trim()).filter(Boolean)
    : String(data.category ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  const techStackRaw = Array.isArray(data.techStack)
    ? data.techStack.map((item) => String(item).trim()).filter(Boolean)
    : String(data.techStack ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  if (!title || !description || categories.length === 0 || techStackRaw.length === 0) {
    return { error: "Title, description, categories, and tech stack are required." };
  }

  return {
    data: {
      title,
      description,
      longDescription: String(data.longDescription ?? "").trim() || null,
      image: String(data.image ?? "").trim() || null,
      techStack: techStackRaw,
      categories,
      liveUrl: String(data.liveUrl ?? "").trim() || null,
      githubUrl: String(data.githubUrl ?? "").trim() || null,
      featured: Boolean(data.featured)
    }
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const tech = searchParams.get("tech") ?? undefined;

    const projects = await listProjects({ category, tech });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to load projects:", error);
    return NextResponse.json({ message: "Failed to load projects." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const json = await request.json();
    const result = parseProjectPayload(json);

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    const project = await createProject(result.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ message: "Failed to create project." }, { status: 500 });
  }
}
