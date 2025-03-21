import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to test results log file
const TEST_LOG_FILE = path.join(process.cwd(), 'form-test-results.json');

// Initialize test log file if it doesn't exist
try {
  if (!fs.existsSync(TEST_LOG_FILE)) {
    fs.writeFileSync(TEST_LOG_FILE, JSON.stringify({ tests: [], last_run: null }), 'utf8');
  }
} catch (error) {
  console.error('Error initializing test log file:', error);
}

// Helper function to log test results
function logTestResult(testName: string, success: boolean, details: any) {
  try {
    const testLogs = JSON.parse(fs.readFileSync(TEST_LOG_FILE, 'utf8'));
    
    testLogs.tests.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      test_name: testName,
      success,
      details
    });
    
    // Keep only the latest 100 test results
    if (testLogs.tests.length > 100) {
      testLogs.tests = testLogs.tests.slice(0, 100);
    }
    
    testLogs.last_run = new Date().toISOString();
    
    fs.writeFileSync(TEST_LOG_FILE, JSON.stringify(testLogs, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error logging test result:', error);
    return false;
  }
}

// Function to test a form submission
async function testFormSubmission(formName: string, formData: Record<string, string>) {
  try {
    console.log(`Testing form submission for ${formName}...`);
    
    // Call our form debugging middleware
    const response = await fetch('https://formspree.io/f/xzzeddgr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const responseStatus = response.status;
    
    let responseBody;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = await response.text();
    }
    
    const success = response.ok;
    
    // Log the test result
    logTestResult(formName, success, {
      status: responseStatus,
      response: responseBody,
      form_data: formData
    });
    
    return {
      success,
      status: responseStatus,
      response: responseBody
    };
  } catch (error) {
    console.error(`Error testing ${formName}:`, error);
    
    // Log the test failure
    logTestResult(formName, false, {
      error: error instanceof Error ? error.message : String(error),
      form_data: formData
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Define test cases for each form
const testCases = {
  simpleContactForm: {
    name: "Test User",
    email: "test@example.com",
    message: "This is an automated test message from the Simple Contact Form."
  },
  
  contactPage: {
    name: "Test User",
    email: "test@example.com",
    phone: "555-123-4567",
    service: "computer-repair",
    message: "This is an automated test message from the Contact Page.",
    consent: "yes"
  },
  
  pricingCalculator: {
    name: "Test User",
    email: "test@example.com",
    phone: "555-123-4567",
    company: "Test Company",
    message: "This is an automated test message from the Pricing Calculator.",
    calculator_type: "managed",
    plan: "Standard",
    user_count: "10",
    estimated_price: "949",
    additional_services: "Cloud Services Management"
  },
  
  serviceAssessment: {
    name: "Test User",
    email: "test@example.com",
    phone: "555-123-4567",
    assessment_data: JSON.stringify({
      business_type: "business",
      business_size: "small",
      current_it: "occasional",
      top_concerns: ["security", "reliability", "cost"],
      urgency: "soon"
    })
  }
};

// API route to run tests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testName = searchParams.get('test');
  
  if (testName && testName !== 'all' && !testCases[testName as keyof typeof testCases]) {
    return NextResponse.json({
      error: `Invalid test name. Available tests: ${Object.keys(testCases).join(', ')}, or 'all'`
    }, { status: 400 });
  }
  
  try {
    const results: Record<string, any> = {};
    
    if (testName === 'all') {
      // Run all tests
      for (const [name, data] of Object.entries(testCases)) {
        results[name] = await testFormSubmission(name, data);
      }
    } else if (testName) {
      // Run single test
      const testData = testCases[testName as keyof typeof testCases];
      results[testName] = await testFormSubmission(testName, testData);
    } else {
      // Default to running all tests
      for (const [name, data] of Object.entries(testCases)) {
        results[name] = await testFormSubmission(name, data);
      }
    }
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      results
    });
  } catch (error) {
    console.error('Error running tests:', error);
    return NextResponse.json({
      error: 'Error running tests',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Get test results
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  try {
    if (!fs.existsSync(TEST_LOG_FILE)) {
      return NextResponse.json({ tests: [], last_run: null });
    }
    
    const testLogs = JSON.parse(fs.readFileSync(TEST_LOG_FILE, 'utf8'));
    return NextResponse.json(testLogs);
  } catch (error) {
    console.error('Error getting test logs:', error);
    return NextResponse.json({
      error: 'Error getting test logs',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}