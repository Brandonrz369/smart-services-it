import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to form submissions log file
const SUBMISSIONS_LOG_FILE = path.join(
  process.cwd(),
  "form-submissions-log.json",
);

// Get form submissions from the log file
export async function GET(_request: Request) {
  try {
    // Check if the log file exists
    if (!fs.existsSync(SUBMISSIONS_LOG_FILE)) {
      // Return empty data structure if file doesn't exist
      return NextResponse.json({
        submissions: [],
        stats: {
          total_submissions: 0,
          successful_submissions: 0,
          failed_submissions: 0,
          last_submission: null,
        },
      });
    }

    // Read the log file
    const data = fs.readFileSync(SUBMISSIONS_LOG_FILE, "utf8");
    const logs = JSON.parse(data);

    return NextResponse.json(logs);
  } catch (err) {
    console.error("Error reading form submissions log:", err);

    return NextResponse.json(
      {
        error: "Failed to read form submissions log",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
