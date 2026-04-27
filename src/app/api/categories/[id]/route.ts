import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, updateCategory } from "@/server/portfolio-data";
import { isAdminAuthorizedFromRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return NextResponse.json({ message: "Invalid category id." }, { status: 400 });
    }

    const body = (await request.json()) as { name?: unknown };
    const name = String(body?.name ?? "").trim();
    if (!name) {
      return NextResponse.json({ message: "Category name is required." }, { status: 400 });
    }

    const category = await updateCategory(categoryId, name);
    if (!category) {
      return NextResponse.json({ message: "Category not found." }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json({ message: "Failed to update category." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return NextResponse.json({ message: "Invalid category id." }, { status: 400 });
    }

    const deleted = await deleteCategory(categoryId);
    if (!deleted) {
      return NextResponse.json({ message: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json({ message: "Failed to delete category." }, { status: 500 });
  }
}
