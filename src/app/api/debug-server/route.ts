import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to debug log file
const DEBUG_LOG_FILE = path.join(process.cwd(), "debug-server-log.json");

// Initialize log file if it doesn't exist
try {
  if (!fs.existsSync(DEBUG_LOG_FILE)) {
    fs.writeFileSync(
      DEBUG_LOG_FILE,
      JSON.stringify({
        logs: [],
        server_info: {
          start_time: new Date().toISOString(),
          environment: process.env.NODE_ENV || "development",
          version: "1.0.0",
        },
      }),
      "utf8",
    );
  }
} catch (error) {
  console.error("Error initializing debug log file:", error);
}

// Helper function to read logs
function readLogs() {
  try {
    const data = fs.readFileSync(DEBUG_LOG_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading debug logs:", error);
    return { logs: [], server_info: {} };
  }
}

// Helper function to write logs
function writeLogs(logs: any) {
  try {
    fs.writeFileSync(DEBUG_LOG_FILE, JSON.stringify(logs, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing debug logs:", error);
  }
}

// Function to add a log entry
function addLogEntry(type: string, message: string, data: any = null) {
  try {
    const logs = readLogs();
    logs.logs.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type,
      message,
      data,
    });

    // Keep only the latest 500 logs
    if (logs.logs.length > 500) {
      logs.logs = logs.logs.slice(0, 500);
    }

    writeLogs(logs);
    return true;
  } catch (error) {
    console.error("Error adding log entry:", error);
    return false;
  }
}

// Debug server endpoint - handles both log retrieval and adding new logs
export async function POST(request: Request) {
  try {
    // Extract authorization from the request headers directly
    const authorization = request.headers.get("authorization") || "";

    // Simple API key check - in production you'd want something more secure
    const apiKey = process.env.DEBUG_API_KEY || "debug-server-key";
    if (authorization !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { action, type, message, data } = body;

    // Add request metadata to logs
    console.log(`Debug server: ${action} request received`);

    if (action === "log") {
      // Add a new log entry
      if (!type || !message) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      const success = addLogEntry(type, message, data);
      return NextResponse.json({ success });
    } else if (action === "get_logs") {
      // Retrieve logs with optional filtering
      const logs = readLogs();

      // Filter logs if filter is provided
      if (data?.filter) {
        const filter = data.filter;
        const limit = data.limit || 100;

        if (filter.type) {
          logs.logs = logs.logs.filter((log: any) => log.type === filter.type);
        }

        if (filter.search) {
          const searchTerm = filter.search.toLowerCase();
          logs.logs = logs.logs.filter(
            (log: any) =>
              (log.message && log.message.toLowerCase().includes(searchTerm)) ||
              (log.type && log.type.toLowerCase().includes(searchTerm)),
          );
        }

        logs.logs = logs.logs.slice(0, limit);
      }

      return NextResponse.json(logs);
    } else if (action === "clear_logs") {
      // Clear all logs
      const logs = readLogs();
      logs.logs = [];
      logs.server_info.last_cleared = new Date().toISOString();
      writeLogs(logs);
      return NextResponse.json({ success: true });
    } else if (action === "test_formspree") {
      // Test FormSpree connectivity
      try {
        addLogEntry("info", "Testing FormSpree connectivity", {
          endpoint: "https://formspree.io/f/xzzeddgr",
        });

        const testData = {
          _test: true,
          name: "Debug Server Test",
          email: "test@debugserver.com",
          message: "This is a test submission from the debug server",
        };

        const response = await fetch("https://formspree.io/f/xzzeddgr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(testData),
        });

        const responseStatus = response.status;
        let responseBody;

        try {
          responseBody = await response.json();
        } catch {
          responseBody = await response.text();
        }

        addLogEntry(
          responseStatus >= 200 && responseStatus < 300 ? "success" : "error",
          `FormSpree test response: ${responseStatus}`,
          { status: responseStatus, body: responseBody },
        );

        return NextResponse.json({
          success: responseStatus >= 200 && responseStatus < 300,
          status: responseStatus,
          response: responseBody,
        });
      } catch (error) {
        addLogEntry("error", "FormSpree test error", {
          error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({
          success: false,
          error: "Error connecting to FormSpree",
          details: error instanceof Error ? error.message : String(error),
        });
      }
    } else if (action === "check_environment") {
      // Check server environment
      const envInfo = {
        node_version: process.version,
        platform: process.platform,
        arch: process.arch,
        env: process.env.NODE_ENV,
        uptime: process.uptime(),
        memory_usage: process.memoryUsage(),
        current_time: new Date().toISOString(),
        process_id: process.pid,
      };

      addLogEntry("info", "Environment check requested", envInfo);
      return NextResponse.json({ success: true, environment: envInfo });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in debug server route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// Simple GET endpoint to check if debug server is running
export async function GET() {
  try {
    // Log the request for debugging
    console.log("Debug server GET request received");

    const logs = readLogs();
    return NextResponse.json({
      status: "Debug server running",
      server_info: logs.server_info,
      log_count: logs.logs.length,
    });
  } catch (error) {
    console.error("Error in debug server GET route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
