import { NextRequest, NextResponse } from "next/server";
import { listSkills } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const skills = await listSkills(category);

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Failed to load skills:", error);
    return NextResponse.json({ message: "Failed to load skills." }, { status: 500 });
  }
}
