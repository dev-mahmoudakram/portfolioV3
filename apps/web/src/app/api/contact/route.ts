import { NextResponse } from "next/server";
import type { ContactPayload } from "@mahmoud-portfolio/types";
import { createContactMessage } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const result = await createContactMessage(payload);

    if (result.errors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed.",
          errors: result.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while saving your message."
      },
      { status: 500 }
    );
  }
}
