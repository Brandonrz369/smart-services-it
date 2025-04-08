import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    // Send a test submission directly to FormSpree
    const testData = {
      name: "Test User (Direct API)",
      email: "test@example.com",
      message: "This is a test submission from the direct test API.",
    };

    const response = await fetch("https://formspree.io/f/xzzeddgr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(testData),
    });

    // Get the response status and text
    const status = response.status;
    let responseBody;

    try {
      responseBody = await response.json();
    } catch {
      responseBody = await response.text();
    }

    // Return the test results
    return NextResponse.json({
      success: response.ok,
      timestamp: new Date().toISOString(),
      status,
      response: responseBody,
      test_data: testData,
    });
  } catch (error) {
    console.error("Error in direct test:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
