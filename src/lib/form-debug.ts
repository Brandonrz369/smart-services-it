/**
 * Form debugging utility functions
 * 
 * This file provides utilities to help debug form submissions by intercepting
 * and logging submissions to our server-side debug API.
 */

// Helper function to send debug logs to the server
export async function logFormDebug(type: string, message: string, data: any = null) {
  try {
    await fetch('/api/debug-server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer debug-server-key'
      },
      body: JSON.stringify({
        action: 'log',
        type,
        message,
        data
      })
    });
  } catch (error) {
    console.error('Failed to log form debug:', error);
  }
}

// Middleware function to intercept form submissions to FormSpree
export async function submitFormWithDebug(
  formData: Record<string, any>,
  formName: string,
  useFormspree = true
) {
  try {
    // Log the submission attempt
    await logFormDebug('info', `Form submission attempt: ${formName}`, {
      submission_time: new Date().toISOString(),
      form_data: { ...formData },
      form_name: formName
    });
    
    if (useFormspree) {
      // Make the actual FormSpree request
      const response = await fetch('https://formspree.io/f/xzzeddgr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      // Get the response data
      let responseData;
      try {
        responseData = await response.clone().json();
      } catch {
        const text = await response.clone().text();
        responseData = { raw_text: text };
      }
      
      // Log the response
      await logFormDebug(
        response.ok ? 'success' : 'error',
        `FormSpree response for ${formName}: ${response.status}`,
        {
          status: response.status,
          status_text: response.statusText,
          response_data: responseData,
          form_name: formName
        }
      );
      
      return {
        success: response.ok,
        status: response.status,
        data: responseData
      };
    } else {
      // Simulate a successful submission for testing
      await logFormDebug(
        'success',
        `Simulated successful submission for ${formName}`,
        { form_name: formName }
      );
      
      return {
        success: true,
        status: 200,
        data: { ok: true, message: 'Simulated successful submission' }
      };
    }
  } catch (error) {
    // Log any errors during submission
    await logFormDebug('error', `Error submitting ${formName}`, {
      error: error instanceof Error ? error.message : String(error),
      form_name: formName
    });
    
    return {
      success: false,
      status: 0,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}