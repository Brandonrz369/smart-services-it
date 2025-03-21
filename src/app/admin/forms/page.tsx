'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TestResult {
  id: string;
  timestamp: string;
  test_name: string;
  success: boolean;
  details: any;
}

interface TestLogs {
  tests: TestResult[];
  last_run: string | null;
}

interface FormSubmission {
  id: string;
  timestamp: string;
  form_name: string;
  form_data: any;
  success: boolean;
  status: number;
  response: any;
}

interface FormSubmissionLogs {
  submissions: FormSubmission[];
  stats: {
    total_submissions: number;
    successful_submissions: number;
    failed_submissions: number;
    last_submission: string | null;
  };
}

export default function FormsMonitor() {
  const [testResults, setTestResults] = useState<TestLogs | null>(null);
  const [formSubmissions, setFormSubmissions] = useState<FormSubmissionLogs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [runningTests, setRunningTests] = useState(false);
  const [activeTab, setActiveTab] = useState<'tests' | 'submissions'>('submissions');
  const router = useRouter();
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const authTime = Number(localStorage.getItem('adminAuthTime') || '0');
    const timeNow = Date.now();
    
    // If not authenticated or session expired (more than 1 hour), redirect to login
    if (!isAuthenticated || (timeNow - authTime > 3600000)) {
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminAuthTime');
      router.push('/admin/login');
    }
  }, [router]);
  
  // Load test results and form submissions on page load
  useEffect(() => {
    fetchTestResults();
    fetchFormSubmissions();
  }, []);
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminAuthTime');
    router.push('/admin/login');
  };
  
  // Fetch test results from the API
  const fetchTestResults = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/debug/auto-test', {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResults(data);
      } else {
        setError(`Error fetching test results: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(`Error fetching test results: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch form submissions
  const fetchFormSubmissions = async () => {
    try {
      setLoading(true);
      // Try to read the submissions log file
      const response = await fetch('/api/form-submissions', {
        method: 'GET'
      });
      
      if (response.ok) {
        const data = await response.json();
        setFormSubmissions(data);
      } else {
        console.error('Failed to fetch form submissions:', response.status);
      }
    } catch (err) {
      console.error('Error fetching form submissions:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Run all form tests
  const runTests = async () => {
    try {
      setRunningTests(true);
      const response = await fetch('/api/debug/auto-test?test=all');
      
      if (response.ok) {
        // Wait a moment for the logs to be updated
        setTimeout(() => {
          fetchTestResults();
          setRunningTests(false);
        }, 500);
      } else {
        setError(`Error running tests: ${response.status} ${response.statusText}`);
        setRunningTests(false);
      }
    } catch (err) {
      setError(`Error running tests: ${err instanceof Error ? err.message : String(err)}`);
      setRunningTests(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Monitor form submissions and test form functionality
        </p>
      </header>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'submissions' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Form Submissions
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tests' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Form Tests
          </button>
        </nav>
      </div>
      
      <div className="mb-8 flex flex-wrap gap-4">
        {activeTab === 'tests' ? (
          <button
            onClick={runTests}
            disabled={runningTests}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              runningTests ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {runningTests ? 'Running Tests...' : 'Run All Form Tests'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={fetchFormSubmissions}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh Submissions
            </button>
            <Link
              href="/web-tools"
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Web Tools
            </Link>
          </div>
        )}
        
        {activeTab === 'tests' && (
          <button
            onClick={fetchTestResults}
            disabled={loading}
            className={`px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Loading...' : 'Refresh Results'}
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      {/* Form Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Recent Form Submissions</h2>
            {formSubmissions?.stats?.last_submission && (
              <p className="text-sm text-gray-600">
                Last submission: {formatDate(formSubmissions.stats.last_submission)}
              </p>
            )}
            
            {formSubmissions?.stats && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Submissions</p>
                  <p className="text-2xl font-bold text-blue-600">{formSubmissions.stats.total_submissions}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Successful</p>
                  <p className="text-2xl font-bold text-green-600">{formSubmissions.stats.successful_submissions}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{formSubmissions.stats.failed_submissions}</p>
                </div>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading submissions...</p>
            </div>
          ) : !formSubmissions?.submissions?.length ? (
            <div className="p-12 text-center text-gray-500">
              <p>No form submissions available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date/Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Form
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formSubmissions.submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(submission.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.form_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.success 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {submission.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <details className="mt-1">
                          <summary className="cursor-pointer text-xs text-blue-500 hover:text-blue-700">
                            View submission details
                          </summary>
                          <div className="mt-2 text-xs p-2 bg-gray-50 rounded overflow-x-auto max-w-lg max-h-48">
                            <h4 className="font-medium mb-1">Form Data:</h4>
                            <pre>{JSON.stringify(submission.form_data, null, 2)}</pre>
                            
                            <h4 className="font-medium mb-1 mt-3">Response:</h4>
                            <pre>{JSON.stringify(submission.response, null, 2)}</pre>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Test Results Tab */}
      {activeTab === 'tests' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Form Test Results</h2>
            {testResults?.last_run && (
              <p className="text-sm text-gray-600">
                Last test run: {formatDate(testResults.last_run)}
              </p>
            )}
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading test results...</p>
            </div>
          ) : !testResults?.tests?.length ? (
            <div className="p-12 text-center text-gray-500">
              <p>No test results available. Run tests to see results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date/Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Form
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testResults.tests.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(result.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.test_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          result.success 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {result.details?.status && (
                          <div>Status: {result.details.status}</div>
                        )}
                        {result.details?.error && (
                          <div className="text-red-600">{result.details.error}</div>
                        )}
                        
                        <details className="mt-1">
                          <summary className="cursor-pointer text-xs text-blue-500 hover:text-blue-700">
                            View details
                          </summary>
                          <pre className="mt-2 text-xs p-2 bg-gray-50 rounded overflow-x-auto max-w-lg max-h-48">
                            {JSON.stringify(result.details, null, 2)}
                          </pre>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Form Test Links</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm">Test individual forms by clicking the links below:</p>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/api/debug/auto-test?test=simpleContactForm" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test Simple Contact Form
                </a>
              </li>
              <li>
                <a 
                  href="/api/debug/auto-test?test=contactPage" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test Contact Page Form
                </a>
              </li>
              <li>
                <a 
                  href="/api/debug/auto-test?test=pricingCalculator" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test Pricing Calculator Form
                </a>
              </li>
              <li>
                <a 
                  href="/api/debug/auto-test?test=serviceAssessment" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test Service Assessment Form
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Debugging Resources</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm">Additional debugging tools and resources:</p>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/web-tools" 
                  className="text-blue-600 hover:underline"
                >
                  Web Tools & Form Debugger
                </Link>
              </li>
              <li>
                <a 
                  href="/api/debug/logs" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Debug Logs (JSON)
                </a>
              </li>
              <li>
                <a 
                  href="/api/direct-test" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Run Direct FormSpree Test
                </a>
              </li>
            </ul>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
              <p className="font-medium text-yellow-800 mb-1">
                Python Debug Client
              </p>
              <p className="text-yellow-700">
                For advanced debugging, use the Python debug client on your server:
                <br />
                <code className="bg-yellow-100 px-1 rounded">python debug_client.py</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}