import { NextResponse } from 'next/server';

export async function GET() {
  // Generate a 5MB random data payload for download test
  const size = 5 * 1024 * 1024; // 5MB in bytes
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  
  // Fill with random data
  for (let i = 0; i < size; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }
  
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
