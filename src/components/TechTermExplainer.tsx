"use client";

import React, { useState } from 'react';
import { trackToolUsage } from "@/lib/analytics";

export default function TechTermExplainer() {
  const [term, setTerm] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    if (!term.trim()) {
      setError("Please enter a term to explain.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setExplanation(null);
    trackToolUsage("WebTools", "explain_term_start", { term });

    try {
      const response = await fetch('/api/explain-term', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term: term.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to fetch explanation');
      }

      setExplanation(data.explanation);
      trackToolUsage("WebTools", "explain_term_complete", { term });

    } catch (err) {
      console.error("Error fetching explanation:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Sorry, couldn't get an explanation. ${errorMessage}`);
      trackToolUsage("WebTools", "explain_term_error", { term, error: errorMessage });
    } finally {
       setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Tech Term Explainer</h3>
       <p className="text-sm text-gray-600 mb-4">
         Enter an IT or technology term (e.g., "DNS", "VPN", "Firewall", "SSD") to get a simple explanation. Powered by research AI.
       </p>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter tech term (e.g., DNS)"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={handleExplain}
          disabled={isLoading || !term.trim()}
          className={`px-5 py-2 rounded-md text-white font-medium transition-colors ${
            isLoading || !term.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? 'Explaining...' : 'Explain Term'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
          Error: {error}
        </div>
      )}

      {explanation && !isLoading && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h4 className="font-semibold text-gray-800 mb-2">Explanation for "{term}":</h4>
          <p className="text-gray-700 whitespace-pre-wrap">{explanation}</p>
        </div>
      )}
    </div>
  );
}
