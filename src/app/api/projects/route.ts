import { NextRequest, NextResponse } from "next/server";
import { listProjects } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const tech = searchParams.get("tech") ?? undefined;

    const projects = await listProjects({ category, tech });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to load projects:", error);
    return NextResponse.json({ message: "Failed to load projects." }, { status: 500 });
  }
}
