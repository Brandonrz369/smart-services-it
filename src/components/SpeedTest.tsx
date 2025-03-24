'use client';

import React, { useState } from 'react';

export default function SpeedTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [testPhase, setTestPhase] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');

  const runSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestPhase('ping');
    
    // Test ping
    const pingStart = performance.now();
    try {
      await fetch('/api/ping-test', { 
        method: 'GET',
        cache: 'no-store'
      });
      const pingEnd = performance.now();
      const pingResult = Math.round(pingEnd - pingStart);
      setPing(pingResult);
    } catch (error) {
      console.error("Error testing ping:", error);
      setPing(null);
    }
    
    setProgress(20);
    setTestPhase('download');
    
    // Download speed test
    try {
      const dlStart = performance.now();
      const response = await fetch('/api/speed-test/download', { 
        cache: 'no-store'
      });
      
      if (response.ok) {
        await response.arrayBuffer(); // Read the entire response
        const dlEnd = performance.now();
        const duration = (dlEnd - dlStart) / 1000; // duration in seconds
        
        // Calculate speed in Mbps
        // Assuming the test file is 5MB
        const fileSize = 5 * 8; // 5MB in megabits
        const dlSpeed = fileSize / duration;
        setDownloadSpeed(parseFloat(dlSpeed.toFixed(2)));
      }
    } catch (error) {
      console.error("Error testing download speed:", error);
      setDownloadSpeed(null);
    }
    
    setProgress(60);
    setTestPhase('upload');
    
    // Upload speed test
    try {
      // Create a 1MB data payload for upload
      const dataSize = 1024 * 1024; // 1MB
      const testData = new ArrayBuffer(dataSize);
      const ulStart = performance.now();
      
      const response = await fetch('/api/speed-test/upload', {
        method: 'POST',
        body: testData,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });
      
      if (response.ok) {
        const ulEnd = performance.now();
        const duration = (ulEnd - ulStart) / 1000; // duration in seconds
        
        // Calculate upload speed in Mbps
        const fileSize = 1 * 8; // 1MB in megabits
        const ulSpeed = fileSize / duration;
        setUploadSpeed(parseFloat(ulSpeed.toFixed(2)));
      }
    } catch (error) {
      console.error("Error testing upload speed:", error);
      setUploadSpeed(null);
    }
    
    setProgress(100);
    setTestPhase('complete');
    setIsRunning(false);
  };

  const formatSpeed = (speed: number | null): string => {
    if (speed === null) return 'Failed';
    return `${speed} Mbps`;
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Network Speed Test</h2>
        <p className="text-gray-600">Test your connection's ping, download, and upload speeds</p>
      </div>
      
      {/* Progress bar */}
      {isRunning && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            {testPhase === 'ping' && 'Testing ping...'}
            {testPhase === 'download' && 'Testing download speed...'}
            {testPhase === 'upload' && 'Testing upload speed...'}
          </p>
        </div>
      )}
      
      {/* Results display */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-1">Ping</p>
          <p className="text-2xl font-bold">
            {ping !== null ? `${ping} ms` : isRunning ? '...' : '--'}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-1">Download</p>
          <p className="text-2xl font-bold">
            {downloadSpeed !== null ? formatSpeed(downloadSpeed) : isRunning ? '...' : '--'}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-1">Upload</p>
          <p className="text-2xl font-bold">
            {uploadSpeed !== null ? formatSpeed(uploadSpeed) : isRunning ? '...' : '--'}
          </p>
        </div>
      </div>
      
      {/* Start button */}
      <div className="text-center">
        <button
          onClick={runSpeedTest}
          disabled={isRunning}
          className={`px-6 py-3 rounded-md text-white font-medium ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 transition-colors'
          }`}
        >
          {isRunning ? 'Testing...' : 'Start Speed Test'}
        </button>
      </div>
    </div>
  );
}