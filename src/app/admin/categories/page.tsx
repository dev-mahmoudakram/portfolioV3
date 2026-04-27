import { AdminCategoriesManager } from "@/components/admin/AdminCategoriesManager";
import { listCategories } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await listCategories().catch(() => []);
  return <AdminCategoriesManager initialCategories={categories} />;
}
