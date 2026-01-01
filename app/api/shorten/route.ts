import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { genSusSlug } from "@/lib/shorten";

export async function POST(req: Request) {
  try {
    await initDb();
    
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "url required" }, { status: 400 });
    }

    let slug;
    let exists = true;

    while (exists) {
      slug = genSusSlug();
      const result = await pool.query(
        "SELECT 1 FROM urls WHERE slug = $1 LIMIT 1",
        [slug]
      );
      exists = result.rowCount > 0;
    }

    await pool.query(
      "INSERT INTO urls (slug, original_url) VALUES ($1, $2)",
      [slug, url]
    );

    return NextResponse.json({
      slug,
      short: `slug.ly/${slug}`,
    });
  } catch (error) {
    console.error("Error in /api/shorten:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
