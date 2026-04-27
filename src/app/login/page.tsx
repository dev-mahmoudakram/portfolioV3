import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminAuthorizedFromCookieStore } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

interface LoginPageProps {
  searchParams: Promise<{
    next?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const { next } = await searchParams;

  if (isAdminAuthorizedFromCookieStore(cookieStore)) {
    redirect(next || "/admin");
  }

  return (
    <main className="section-shell pb-20 pt-28">
      <LoginForm />
    </main>
  );
}
