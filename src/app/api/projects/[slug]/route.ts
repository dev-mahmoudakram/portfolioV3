import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json({ message: `Project "${slug}" was not found.` }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    const { slug } = await params;
    console.error(`Failed to load project "${slug}":`, error);
    return NextResponse.json({ message: "Failed to load project." }, { status: 500 });
  }
}
