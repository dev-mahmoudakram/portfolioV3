import { NextResponse } from "next/server";
import { deleteProjectBySlug, getProjectBySlug, updateProjectBySlug } from "@/server/portfolio-data";
import { isAdminAuthorizedFromRequest } from "@/lib/admin-auth";

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

function parseProjectPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload." };
  }

  const data = payload as Record<string, unknown>;
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const categories = Array.isArray(data.categories)
    ? data.categories.map((item) => String(item).trim()).filter(Boolean)
    : String(data.category ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  const techStackRaw = Array.isArray(data.techStack)
    ? data.techStack.map((item) => String(item).trim()).filter(Boolean)
    : String(data.techStack ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  if (!title || !description || categories.length === 0 || techStackRaw.length === 0) {
    return { error: "Title, description, categories, and tech stack are required." };
  }

  return {
    data: {
      title,
      description,
      longDescription: String(data.longDescription ?? "").trim() || null,
      image: String(data.image ?? "").trim() || null,
      techStack: techStackRaw,
      categories,
      liveUrl: String(data.liveUrl ?? "").trim() || null,
      githubUrl: String(data.githubUrl ?? "").trim() || null,
      featured: Boolean(data.featured)
    }
  };
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { slug } = await params;
    const json = await request.json();
    const result = parseProjectPayload(json);

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    const project = await updateProjectBySlug(slug, result.data);
    if (!project) {
      return NextResponse.json({ message: `Project "${slug}" was not found.` }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    const { slug } = await params;
    console.error(`Failed to update project "${slug}":`, error);
    return NextResponse.json({ message: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    if (!isAdminAuthorizedFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { slug } = await params;
    const deleted = await deleteProjectBySlug(slug);

    if (!deleted) {
      return NextResponse.json({ message: `Project "${slug}" was not found.` }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const { slug } = await params;
    console.error(`Failed to delete project "${slug}":`, error);
    return NextResponse.json({ message: "Failed to delete project." }, { status: 500 });
  }
}
