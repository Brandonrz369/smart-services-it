import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    console.log("Form submission received:", formData);
    
    // Send the form data to FormSpree
    const response = await fetch('https://formspree.io/f/xzzeddgr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    // Process the FormSpree response
    let responseData;
    if (response.ok) {
      try {
        responseData = await response.json();
      } catch (error) {
        responseData = { message: 'Form submitted successfully, but could not parse response' };
      }
      
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully',
        data: responseData
      });
    } else {
      try {
        responseData = await response.json();
      } catch (error) {
        responseData = { error: `FormSpree returned status: ${response.status}` };
      }
      
      return NextResponse.json({
        success: false,
        message: 'Form submission failed',
        error: responseData,
        status: response.status
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Error in form submission:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Server error processing form',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}