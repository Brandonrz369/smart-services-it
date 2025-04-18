import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

// =========================================================================
// MCP Interaction Implementation (Using HTTP Fetch)
// =========================================================================
// This function attempts to call the locally running researcher-mcp server.
// ASSUMPTION: The MCP server is running and listening for POST requests
//             on http://localhost:3001/search
//             (Verify this port and path are correct for your MCP server setup)
// =========================================================================
async function callResearcherMcpSearch(query: string): Promise<string> {
  const mcpServerUrl = 'http://localhost:3001/search'; // <-- VERIFY THIS URL/PORT
  console.log(`Attempting to call researcher-mcp 'search' tool at ${mcpServerUrl} with query: "${query}"`);

  try {
    const response = await fetch(mcpServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: `Explain the term "${query}" in simple terms.` }), // Format query for explanation
    });

    if (!response.ok) {
      throw new Error(`MCP server responded with status: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Assuming the MCP server returns JSON like { "answer": "..." }
    // Adjust this based on the actual response structure of the 'search' tool
    if (typeof result.answer !== 'string') {
       throw new Error('Invalid response structure from MCP server.');
    }

    console.log("Successfully received response from researcher-mcp search.");
    return result.answer;

  } catch (error) {
    console.error("Error calling researcher-mcp search:", error);
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
       throw new Error("Could not connect to the local researcher-mcp server. Is it running?");
    }
    throw new Error("Failed to get explanation from the research service.");
  }
}
// =========================================================================


// Rate limiting
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '30 s'), // Allow 10 requests per 30 seconds
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export async function POST(req: NextRequest) {
  // Check rate limit
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const term = body.term;

    if (!term || typeof term !== 'string' || term.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid term provided' }, { status: 400 });
    }

    if (term.length > 100) { // Basic validation
        return NextResponse.json({ error: 'Term is too long' }, { status: 400 });
    }

    console.log(`Explain Term API received term: "${term}"`);

    // --- Call MCP Tool ---
    const explanation = await callResearcherMcpSearch(term.trim());
    // ---

    return NextResponse.json({ explanation });

  } catch (error) {
    console.error('Error in /api/explain-term:', error);
    let errorMessage = 'Sorry, I encountered an error trying to get an explanation.';
    if (error instanceof Error) {
      errorMessage = error.message; // Use the specific error from the MCP call attempt
    }
     return NextResponse.json({ error: 'Failed to get explanation', details: errorMessage }, { status: 500 });
  }
}

// Optional: Add edge runtime configuration if preferred and compatible
// export const runtime = 'edge';
