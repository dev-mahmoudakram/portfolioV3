import { ProjectsCatalog } from "@/components/projects/ProjectsCatalog";
import { listProjects, listCategories } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    listProjects().catch(() => []),
    listCategories().catch(() => []),
  ]);

  const categoryNames = categories.map((c) => c.name);

  return (
    <main>
      <ProjectsCatalog projects={projects} categories={categoryNames} />
    </main>
  );
}
