"use client";

import { useState } from "react";

export default function FormDebugger() {
  const [formEndpoint, setFormEndpoint] = useState(
    "https://formspree.io/f/xzzeddgr",
  );
  const [formMethod, setFormMethod] = useState<"json" | "formdata">("json");
  const [formFields, setFormFields] = useState([
    { name: "name", value: "Test User" },
    { name: "email", value: "test@example.com" },
    { name: "message", value: "This is a test message from the form debugger" },
  ]);
  const [submissionResult, setSubmissionResult] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    response?: any;
    error?: any;
    logs: string[];
  }>({
    status: "idle",
    logs: [],
  });

  // Add a field to the form
  const addField = () => {
    setFormFields([...formFields, { name: "", value: "" }]);
  };

  // Update a field
  const updateField = (
    index: number,
    field: "name" | "value",
    newValue: string,
  ) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = newValue;
    setFormFields(updatedFields);
  };

  // Remove a field
  const removeField = (index: number) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  // Add a log entry
  const addLog = (message: string) => {
    setSubmissionResult((prev) => ({
      ...prev,
      logs: [
        ...prev.logs,
        `${new Date().toISOString().substring(11, 19)} - ${message}`,
      ],
    }));
  };

  // Clear logs
  const clearLogs = () => {
    setSubmissionResult((prev) => ({
      ...prev,
      logs: [],
    }));
  };

  // Reset the form
  const resetForm = () => {
    setSubmissionResult({
      status: "idle",
      logs: [],
    });
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous results
    setSubmissionResult({
      status: "submitting",
      logs: [],
    });

    try {
      addLog(
        `Starting form submission to ${formEndpoint} using ${formMethod} method`,
      );

      // Create form data object from our fields
      const formData = new FormData();
      const jsonData: Record<string, string> = {};

      formFields.forEach((field) => {
        if (field.name.trim()) {
          formData.append(field.name, field.value);
          jsonData[field.name] = field.value;
        }
      });

      addLog("Form data prepared successfully");

      // Log the data being sent
      if (formMethod === "json") {
        addLog(`Sending JSON data: ${JSON.stringify(jsonData, null, 2)}`);
      } else {
        const entries: string[] = [];
        formData.forEach((value, key) => {
          entries.push(`${key}: ${value}`);
        });
        addLog(`Sending FormData: {${entries.join(", ")}}`);
      }

      // Send the form data
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formMethod === "json" ? JSON.stringify(jsonData) : formData,
        headers:
          formMethod === "json"
            ? {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
            : {
                Accept: "application/json",
              },
      });

      addLog(`Received response: status ${response.status}`);

      // Try to parse the response
      let responseData;
      const responseText = await response.text();
      addLog(`Response text: ${responseText}`);

      try {
        responseData = JSON.parse(responseText);
        addLog("Response parsed as JSON successfully");
      } catch {
        addLog("Response is not JSON format");
        responseData = responseText;
      }

      if (response.ok) {
        addLog("Form submission successful");
        setSubmissionResult((prev) => ({
          ...prev,
          status: "success",
          response: responseData,
        }));
      } else {
        addLog(`Form submission failed with status ${response.status}`);
        setSubmissionResult((prev) => ({
          ...prev,
          status: "error",
          response: responseData,
        }));
      }
    } catch (error) {
      addLog(
        `Error during submission: ${error instanceof Error ? error.message : String(error)}`,
      );
      console.error("Form submission error:", error);
      setSubmissionResult((prev) => ({
        ...prev,
        status: "error",
        error,
      }));
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">FormSpree Debugger</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Form Configuration</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FormSpree Endpoint
                  </label>
                  <input
                    type="text"
                    value={formEndpoint}
                    onChange={(e) => setFormEndpoint(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submission Method
                  </label>
                  <select
                    value={formMethod}
                    onChange={(e) =>
                      setFormMethod(e.target.value as "json" | "formdata")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="json">JSON (application/json)</option>
                    <option value="formdata">
                      FormData (multipart/form-data)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Form Fields</h3>
                <button
                  type="button"
                  onClick={addField}
                  className="text-sm bg-blue-50 text-blue-600 py-1 px-3 rounded hover:bg-blue-100"
                >
                  + Add Field
                </button>
              </div>

              <div className="space-y-3">
                {formFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Field name"
                        value={field.name}
                        onChange={(e) =>
                          updateField(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Field value"
                        value={field.value}
                        onChange={(e) =>
                          updateField(index, "value", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submissionResult.status === "submitting"}
                className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  submissionResult.status === "submitting"
                    ? "opacity-75 cursor-not-allowed"
                    : ""
                }`}
              >
                {submissionResult.status === "submitting"
                  ? "Submitting..."
                  : "Test Submission"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-1">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Debug Logs</h3>
            <button
              onClick={clearLogs}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear logs
            </button>
          </div>

          <div className="h-60 overflow-y-auto bg-gray-50 border border-gray-200 rounded p-3 mb-4 font-mono text-xs">
            {submissionResult.logs.length === 0 ? (
              <p className="text-gray-500 italic">
                No logs yet. Submit the form to see debug information.
              </p>
            ) : (
              submissionResult.logs.map((log, index) => (
                <div key={index} className="pb-1">
                  {log}
                </div>
              ))
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2">Result</h3>
          <div
            className={`p-3 border rounded-md mb-4 ${
              submissionResult.status === "success"
                ? "bg-green-50 border-green-200"
                : submissionResult.status === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
            }`}
          >
            <p className="font-medium mb-2">
              Status:{" "}
              {submissionResult.status === "idle"
                ? "Ready"
                : submissionResult.status === "submitting"
                  ? "Submitting..."
                  : submissionResult.status === "success"
                    ? "Success ✓"
                    : submissionResult.status === "error"
                      ? "Error ✗"
                      : ""}
            </p>

            {(submissionResult.response || submissionResult.error) && (
              <pre className="whitespace-pre-wrap text-xs overflow-x-auto">
                {JSON.stringify(
                  submissionResult.response || submissionResult.error,
                  null,
                  2,
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
