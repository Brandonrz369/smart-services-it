/**
 * Form submission helpers
 *
 * Simple utilities to handle form submissions with consistent error handling
 */

/**
 * Submit a form using our centralized submission endpoint
 *
 * @param formData Form data as a record
 * @param formName Name of the form for tracking
 * @returns Result object with success status and response data
 */
export async function submitForm(
  formData: Record<string, any>,
  formName: string,
): Promise<{
  success: boolean;
  status: number;
  message?: string;
  error?: string;
  data?: any;
}> {
  try {
    console.log(`Submitting form: ${formName}`);

    // Submit to our form submission API endpoint
    const response = await fetch("/api/form-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form_data: formData,
        form_name: formName,
      }),
    });

    // Parse the response
    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Error parsing form submission response:", error);
      return {
        success: false,
        status: response.status,
        error: "Failed to parse server response",
      };
    }

    // Return the result
    return {
      success: result.success,
      status: result.status || response.status,
      message: result.message,
      error: result.error,
      data: result.data,
    };
  } catch (error) {
    // Handle network errors
    console.error("Network error during form submission:", error);
    return {
      success: false,
      status: 0,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
