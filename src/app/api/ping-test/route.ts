import { NextResponse } from "next/server";

export async function GET() {
  // Simple ping endpoint, just returns 200 OK
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
