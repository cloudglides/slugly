import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { urls } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { genSusSlug } from "@/lib/shorten";

const ipRequests = new Map<string, { count: number; resetTime: number }>();

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record || now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (record.count >= 10) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const db = getDb();
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "url required" }, { status: 400 });
    }

    const existing = await db.select().from(urls).where(eq(urls.originalUrl, url)).limit(1);
    
    if (existing.length > 0) {
      const baseUrl = process.env.BASE_URL || "https://slug.ly";
      return NextResponse.json({
        slug: existing[0].slug,
        short: `${baseUrl}/${existing[0].slug}`,
        cached: true,
      });
    }

    let slug = genSusSlug();
    let slugExists = true;
    let attempts = 0;

    while (slugExists && attempts < 100) {
      slug = genSusSlug();
      const result = await db.select().from(urls).where(eq(urls.slug, slug)).limit(1);
      slugExists = result.length > 0;
      attempts++;
    }

    await db.insert(urls).values({
      slug,
      originalUrl: url,
    });

    const baseUrl = process.env.BASE_URL || "https://slug.ly";
    
    return NextResponse.json({
      slug,
      short: `${baseUrl}/${slug}`,
    });
  } catch (error: any) {
    console.error("Shorten error:", error);
    return NextResponse.json(
      { error: "Failed to shorten URL", message: error.message },
      { status: 500 }
    );
  }
}
