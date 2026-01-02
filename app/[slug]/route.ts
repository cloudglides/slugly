import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { urls } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDb();

    const result = await db
      .select()
      .from(urls)
      .where(eq(urls.slug, slug))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.redirect(result[0].originalUrl, { status: 301 });
  } catch (error: any) {
    console.error("Redirect error:", error);
    return NextResponse.json(
      { error: "Failed to redirect", message: error.message },
      { status: 500 }
    );
  }
}
