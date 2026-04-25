import { NextResponse } from "next/server";
import { listFeaturedProjects } from "@/server/portfolio-data";

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
