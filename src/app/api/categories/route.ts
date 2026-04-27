import { NextRequest, NextResponse } from "next/server";
import { createCategory, listCategories } from "@/server/portfolio-data";
import { isAdminAuthorizedFromRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to load categories:", error);
    return NextResponse.json({ message: "Failed to load categories." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as { name?: unknown };
    const name = String(body?.name ?? "").trim();

    if (!name) {
      return NextResponse.json({ message: "Category name is required." }, { status: 400 });
    }

    const category = await createCategory(name);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ message: "Failed to create category." }, { status: 500 });
  }
}
