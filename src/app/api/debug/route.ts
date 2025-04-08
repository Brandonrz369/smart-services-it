import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to log file
const LOG_FILE = path.join(process.cwd(), "form-submissions-log.json");

// Initialize log file if it doesn't exist
try {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify({ logs: [] }), "utf8");
  }
} catch (error) {
  console.error("Error initializing log file:", error);
}

// Helper function to read logs
function readLogs() {
  try {
    const data = fs.readFileSync(LOG_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading logs:", error);
    return { logs: [] };
  }
}

// Helper function to write logs
function writeLogs(logs: any) {
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing logs:", error);
  }
}

// Function to log a form submission
function logSubmission(data: any) {
  try {
    const logs = readLogs();
    logs.logs.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      data,
    });

    // Keep only the latest 100 logs
    if (logs.logs.length > 100) {
      logs.logs = logs.logs.slice(0, 100);
    }

    writeLogs(logs);
  } catch (error) {
    console.error("Error logging submission:", error);
  }
}

// Proxy and log the submission
export async function POST(request: Request) {
  try {
    // Get the request headers and body
    const contentType = request.headers.get("content-type") || "";
    const referrer = request.headers.get("referer") || "";
    const userAgent = request.headers.get("user-agent") || "";

    // Clone the request to get the body
    const body = await request.clone().text();

    // Prepare data for logging
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = body;
    }

    // Log the submission
    logSubmission({
      method: "POST",
      contentType,
      referrer,
      userAgent,
      body: parsedBody,
      timestamp: new Date().toISOString(),
      headers: {
        contentType,
        referrer,
        userAgent,
      },
    });

    // Proxy the request to FormSpree
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/xzzeddgr", {
        method: "POST",
        headers: {
          "Content-Type": contentType,
          Accept: "application/json",
        },
        body,
      });

      // Get the response
      const responseStatus = formspreeResponse.status;
      const responseText = await formspreeResponse.text();

      // Log the response
      logSubmission({
        type: "response",
        status: responseStatus,
        body: responseText,
        timestamp: new Date().toISOString(),
      });

      // Return the response to the client
      return new NextResponse(responseText, {
        status: responseStatus,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error proxying to FormSpree:", error);
      logSubmission({
        type: "proxy_error",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });

      return new NextResponse(
        JSON.stringify({ error: "Error forwarding request to FormSpree" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    console.error("Error in debug route:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// Endpoint to get logs
export async function GET() {
  try {
    const logs = readLogs();
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error getting logs:", error);
    return NextResponse.json({ error: "Error getting logs" }, { status: 500 });
  }
}
