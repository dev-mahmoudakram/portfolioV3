import { AdminProjectsDashboard } from "@/components/admin/AdminProjectsDashboard";
import { listCategories, listProjects, listSkills } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await listProjects().catch(() => []);
  const skills = await listSkills().catch(() => []);
  const categories = await listCategories().catch(() => []);

  return (
    <AdminProjectsDashboard initialProjects={projects} initialSkills={skills} initialCategories={categories} />
  );
}
