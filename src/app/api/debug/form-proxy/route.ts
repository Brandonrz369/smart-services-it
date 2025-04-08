import { NextResponse } from "next/server";

// This proxy helps avoid CORS issues by making the FormSpree request from the server
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { form_data, form_name } = body;

    if (!form_data) {
      return NextResponse.json(
        {
          error: "Missing form_data in request body",
        },
        { status: 400 },
      );
    }

    console.log(
      `Form proxy received submission for: ${form_name || "unknown form"}`,
    );

    // Forward the request to FormSpree
    const response = await fetch("https://formspree.io/f/xzzeddgr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form_data),
    });

    // Get the response from FormSpree
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      const text = await response.text();
      responseData = { raw_text: text };
    }

    // Return the FormSpree response
    return NextResponse.json(
      {
        success: response.ok,
        status: response.status,
        data: responseData,
      },
      { status: response.status },
    );
  } catch (error) {
    console.error("Error in form proxy:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
