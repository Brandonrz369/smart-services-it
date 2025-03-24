import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Just receive the data, the actual test is measuring how long it takes to upload
    await request.arrayBuffer();
    
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in upload speed test:', error);
    return new NextResponse(JSON.stringify({ success: false, error: 'Upload test failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
