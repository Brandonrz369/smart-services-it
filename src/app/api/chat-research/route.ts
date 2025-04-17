import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

// --- MCP Tool Simulation ---
// In a real scenario, you'd import and use the actual MCP client/tool functions.
// For this simulation, we'll define a placeholder function.
async function callResearcherMcpReason(query: string): Promise<string> {
  console.log(`Simulating call to researcher-mcp 'reason' tool with query: "${query}"`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate different responses based on query complexity or keywords
  if (query.toLowerCase().includes("compare")) {
    return `Based on my analysis, comparing A and B shows that A excels in X while B is better for Y. Consider your specific needs for Z to make the best choice.`;
  } else if (query.toLowerCase().includes("explain")) {
    return `Certainly. [Topic] involves several key concepts: Concept 1, Concept 2, and Concept 3. It's important because of [Reason]. Would you like more detail on any specific part?`;
  } else if (query.length > 150) {
     return `That's a detailed question! Based on my research, the key factors are [Factor 1], [Factor 2], and [Factor 3]. The implications for your situation might involve [Implication A] and [Implication B]. Further investigation into [Specific Area] could provide more clarity.`;
  } else {
    // Generic simulated research response
    return `I've researched your query about "${query.substring(0, 50)}...". The key findings suggest that [Finding 1] and [Finding 2] are most relevant. It often depends on factors like [Factor A] and [Factor B].`;
  }
  // Simulate potential error
  // throw new Error("Simulated MCP connection error");
}
// --- End MCP Tool Simulation ---


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
    // Replace this with the actual MCP tool call
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
