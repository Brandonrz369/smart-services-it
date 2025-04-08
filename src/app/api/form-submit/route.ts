import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to form submissions log file
const SUBMISSIONS_LOG_FILE = path.join(
  process.cwd(),
  "form-submissions-log.json",
);

// Initialize log file if it doesn't exist
try {
  if (!fs.existsSync(SUBMISSIONS_LOG_FILE)) {
    fs.writeFileSync(
      SUBMISSIONS_LOG_FILE,
      JSON.stringify({
        submissions: [],
        stats: {
          total_submissions: 0,
          successful_submissions: 0,
          failed_submissions: 0,
          last_submission: null,
        },
      }),
      "utf8",
    );
  }
} catch (err) {
  console.error("Error initializing form submissions log file:", err);
}

// Helper function to log form submissions
function logFormSubmission(
  formName: string,
  formData: any,
  success: boolean,
  status: number,
  response: any,
) {
  try {
    const logs = JSON.parse(fs.readFileSync(SUBMISSIONS_LOG_FILE, "utf8"));

    // Add new submission to the front of the array
    logs.submissions.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      form_name: formName,
      form_data: formData,
      success,
      status,
      response,
    });

    // Keep only the latest 100 submissions
    if (logs.submissions.length > 100) {
      logs.submissions = logs.submissions.slice(0, 100);
    }

    // Update stats
    logs.stats.total_submissions++;
    if (success) {
      logs.stats.successful_submissions++;
    } else {
      logs.stats.failed_submissions++;
    }
    logs.stats.last_submission = new Date().toISOString();

    fs.writeFileSync(
      SUBMISSIONS_LOG_FILE,
      JSON.stringify(logs, null, 2),
      "utf8",
    );
    return true;
  } catch (err) {
    console.error("Error logging form submission:", err);
    return false;
  }
}

// Main form submission handler
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { form_data, form_name } = body;

    // Validate required fields
    if (!form_data) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing form_data in request body",
        },
        { status: 400 },
      );
    }

    console.log(`Form submission received for: ${form_name || "unknown form"}`);

    // Submit to FormSpree
    const formspreeResponse = await fetch("https://formspree.io/f/xzzeddgr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form_data),
    });

    // Process FormSpree response
    let responseData;
    try {
      responseData = await formspreeResponse.json();
    } catch {
      try {
        const text = await formspreeResponse.text();
        responseData = { raw_text: text };
      } catch {
        responseData = { error: "Failed to parse FormSpree response" };
      }
    }

    // Determine if submission was successful
    const success = formspreeResponse.ok;

    // Log the submission
    logFormSubmission(
      form_name || "unknown",
      form_data,
      success,
      formspreeResponse.status,
      responseData,
    );

    // Return the response to the client
    return NextResponse.json({
      success,
      status: formspreeResponse.status,
      message: success
        ? "Form submitted successfully"
        : "Form submission failed",
      data: responseData,
    });
  } catch (err) {
    console.error("Error handling form submission:", err);

    // Log the failed submission
    try {
      const { form_data = {}, form_name = "unknown" } =
        request.body && typeof request.body === "object"
          ? await request.json()
          : { form_data: {}, form_name: "unknown" };

      logFormSubmission(form_name, form_data, false, 500, {
        error: err instanceof Error ? err.message : String(err),
      });
    } catch {}

    return NextResponse.json(
      {
        success: false,
        error: "Server error processing form submission",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
