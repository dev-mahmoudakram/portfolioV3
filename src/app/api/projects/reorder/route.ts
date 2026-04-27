import { NextResponse } from "next/server";
import { isAdminAuthorizedFromRequest } from "@/lib/admin-auth";
import { reorderProjects } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as { projectIds?: unknown };
    const projectIds = Array.isArray(body?.projectIds)
      ? body.projectIds.map((item) => Number(item)).filter((item) => Number.isInteger(item) && item > 0)
      : [];

    if (projectIds.length === 0) {
      return NextResponse.json({ message: "projectIds is required." }, { status: 400 });
    }

    const projects = await reorderProjects(projectIds);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to reorder projects:", error);
    return NextResponse.json({ message: "Failed to reorder projects." }, { status: 500 });
  }
}
