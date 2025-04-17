import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

// =========================================================================
// MCP Interaction Implementation (Using HTTP Fetch)
// =========================================================================
// This function attempts to call the locally running researcher-mcp server.
// ASSUMPTION: The MCP server is running and listening for POST requests
//             on http://localhost:3001/reason
//             (Verify this port and path are correct for your MCP server setup)
// =========================================================================
async function callResearcherMcpReason(query: string): Promise<string> {
  const mcpServerUrl = 'http://localhost:3001/reason'; // <-- VERIFY THIS URL/PORT
  console.log(`Attempting to call researcher-mcp 'reason' tool at ${mcpServerUrl} with query: "${query}"`);

  try {
    const response = await fetch(mcpServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }), // Send query in the expected format
      // IMPORTANT: fetch in Node.js might require specific configurations
      // for localhost calls depending on the environment (e.g., keepalive).
      // Vercel functions might have specific ways to handle local service calls.
    });

    if (!response.ok) {
      throw new Error(`MCP server responded with status: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Assuming the MCP server returns JSON like { "answer": "..." }
    // Adjust this based on the actual response structure of the 'reason' tool
    if (typeof result.answer !== 'string') {
       throw new Error('Invalid response structure from MCP server.');
    }

    console.log("Successfully received response from researcher-mcp.");
    return result.answer;

  } catch (error) {
    console.error("Error calling researcher-mcp:", error);
    // Provide a user-friendly error message, but log the technical details
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
       throw new Error("Could not connect to the local researcher-mcp server. Is it running?");
    }
    throw new Error("Failed to get response from the research service.");
  }
}
// =========================================================================


// Rate limiting: Allow 5 requests per 10 seconds per IP
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export async function POST(req: NextRequest) {
  // Check rate limit
  // Correct way to get IP in Vercel Edge/Node.js environments
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '127.0.0.1';
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const userMessage = body.message;
    const history = body.history || []; // Expecting history from frontend

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    // --- Construct Query for MCP ---
    // Combine the latest user message with some history context
    // (Simple example: just use the latest message)
    // More complex logic could summarize history or select relevant parts
    const researchQuery = userMessage;
    // Example with history:
    // const historyContext = history.slice(-4).map((msg: { sender: string; text: string }) => `${msg.sender}: ${msg.text}`).join('\n');
    // const researchQuery = `Based on the following conversation:\n${historyContext}\n\nUser's latest question: ${userMessage}\n\nPlease provide a detailed answer:`;
    // ---

    console.log(`Research API received query: "${researchQuery}"`);

    // --- Call MCP Tool ---
    const mcpResponseText = await callResearcherMcpReason(researchQuery);
    // ---

    // Return the response from the MCP
    return NextResponse.json({ message: mcpResponseText });

  } catch (error) {
    console.error('Error in /api/chat-research:', error);
    let errorMessage = 'Sorry, I encountered an error trying to research that.';
    if (error instanceof Error) {
      errorMessage += ` Details: ${error.message}`;
    }
     // Generic error response
     return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}

// Optional: Add edge runtime configuration if preferred and compatible
// export const runtime = 'edge';
