import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
      return NextResponse.json({ message: `Project "${params.slug}" was not found.` }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(`Failed to load project "${params.slug}":`, error);
    return NextResponse.json({ message: "Failed to load project." }, { status: 500 });
  }
}
