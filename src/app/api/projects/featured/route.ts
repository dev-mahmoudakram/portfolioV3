import { NextResponse } from "next/server";
import { listFeaturedProjects, setFeaturedProjects } from "@/server/portfolio-data";
import { isAdminAuthorizedFromRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await listFeaturedProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to load featured projects:", error);
    return NextResponse.json({ message: "Failed to load featured projects." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as { projectIds?: unknown };
    const projectIdsRaw = Array.isArray(body?.projectIds) ? body.projectIds : [];
    const projectIds = projectIdsRaw
      .map((item) => Number(item))
      .filter((item) => Number.isInteger(item) && item > 0)
      .slice(0, 4);

    if (projectIdsRaw.length > 4) {
      return NextResponse.json({ message: "A maximum of 4 featured projects is allowed." }, { status: 400 });
    }

    const featuredProjects = await setFeaturedProjects(projectIds);
    return NextResponse.json(featuredProjects);
  } catch (error) {
    console.error("Failed to update featured projects:", error);
    return NextResponse.json({ message: "Failed to update featured projects." }, { status: 500 });
  }
}
