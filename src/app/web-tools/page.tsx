'use client';

import React, { useState } from 'react';
import SimpleContactForm from '@/components/SimpleContactForm';
import FormDebugger from '@/components/FormDebugger';
import FormLogger from '@/components/FormLogger';

export default function WebTools() {
  const [activeTab, setActiveTab] = useState<'simple' | 'debug' | 'logs'>('simple');
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Web Tools & Testing</h1>
      
      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 font-medium text-center ${
              activeTab === 'simple' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('simple')}
          >
            Simple Test Form
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium text-center ${
              activeTab === 'debug' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('debug')}
          >
            Form Debugger
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium text-center ${
              activeTab === 'logs' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('logs')}
          >
            Form Logs
          </button>
        </div>
      </div>
      
      {/* Simple Form Tab */}
      {activeTab === 'simple' && (
        <div className="max-w-md mx-auto">
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Form Submission Test</h2>
            <p className="text-gray-600 mb-4">
              This page contains a simple contact form that submits to FormSpree for testing purposes.
            </p>
          </div>
          
          <SimpleContactForm />
        </div>
      )}
      
      {/* Debug Form Tab */}
      {activeTab === 'debug' && (
        <div>
          <div className="mb-8 bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">FormSpree Debugger</h2>
            <p className="text-gray-600 mb-4">
              Use this tool to test your FormSpree configuration with different submission methods and custom fields.
              The debugger provides detailed logs to help diagnose submission issues.
            </p>
          </div>
          
          <FormDebugger />
        </div>
      )}
      
      {/* Form Logs Tab */}
      {activeTab === 'logs' && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Form Submission Logs</h2>
            <p className="text-gray-600 mb-4">
              This panel shows logs from form submissions across the entire website. 
              Use this to track and debug form submissions from any page.
            </p>
          </div>
          
          <FormLogger />
        </div>
      )}
    </div>
  );
}