import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  try {
    const url = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;
    
    return NextResponse.json({
      dbUrl: !!url,
      env: Object.keys(process.env).filter(k => k.includes('DATABASE')),
    });

    const pool = new Pool({
      connectionString: url,
    });

    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    await pool.end();

    return NextResponse.json({
      success: true,
      time: result.rows[0],
      env: !!process.env.DATABASE_URL,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
