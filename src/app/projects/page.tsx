import { ProjectsCatalog } from "@/components/projects/ProjectsCatalog";
import { listProjects } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await listProjects().catch(() => []);

  return (
    <main>
      <ProjectsCatalog projects={projects} />
    </main>
  );
}
