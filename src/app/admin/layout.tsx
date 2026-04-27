import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { isAdminAuthorizedFromCookieStore } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (!isAdminAuthorizedFromCookieStore(cookieStore)) {
    redirect("/login?next=/admin");
  }

  return (
    <main className="pb-10 lg:pl-[310px]">
      <AdminSidebar />
      <div className="px-4 pt-8 sm:px-6 lg:px-10">{children}</div>
    </main>
  );
}
