'use client';

import React, { useState } from 'react';
import { trackToolUsage } from '@/lib/analytics';
import { 
  speedTestConfig, 
  calibrateSpeed, 
  calibratePing 
} from '@/lib/speed-test-config';

export default function SpeedTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [rawDownloadSpeed, setRawDownloadSpeed] = useState<number | null>(null);
  const [rawUploadSpeed, setRawUploadSpeed] = useState<number | null>(null);
  const [rawPing, setRawPing] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [testPhase, setTestPhase] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const runSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestPhase('ping');
    
    // Track test start in analytics
    trackToolUsage('SpeedTest', 'start');
    
    // Test ping
    const pingStart = performance.now();
    try {
      await fetch('/api/ping-test', { 
        method: 'GET',
        cache: 'no-store'
      });
      const pingEnd = performance.now();
      const measuredPing = Math.round(pingEnd - pingStart);
      setRawPing(measuredPing);
      
      // Apply calibration to get more realistic ping value
      const calibratedPing = Math.round(calibratePing(
        measuredPing,
        speedTestConfig.pingCalibrationFactor,
        speedTestConfig.minPing
      ));
      
      setPing(calibratedPing);
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
        
        // Calculate raw speed in Mbps
        const fileSize = speedTestConfig.downloadFileSize * 8; // MB to megabits
        const measuredSpeed = fileSize / duration;
        setRawDownloadSpeed(parseFloat(measuredSpeed.toFixed(2)));
        
        // Apply calibration to get more realistic download speed
        const calibratedSpeed = calibrateSpeed(
          measuredSpeed,
          speedTestConfig.downloadCalibrationFactor,
          speedTestConfig.maxDownloadSpeed
        );
        
        setDownloadSpeed(parseFloat(calibratedSpeed.toFixed(2)));
      }
    } catch (error) {
      console.error("Error testing download speed:", error);
      setDownloadSpeed(null);
    }
    
    setProgress(60);
    setTestPhase('upload');
    
    // Upload speed test
    try {
      // Create data payload for upload based on config
      const dataSize = speedTestConfig.uploadFileSize * 1024 * 1024; // MB to bytes
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
        
        // Calculate raw upload speed in Mbps
        const fileSize = speedTestConfig.uploadFileSize * 8; // MB to megabits
        const measuredSpeed = fileSize / duration;
        setRawUploadSpeed(parseFloat(measuredSpeed.toFixed(2)));
        
        // Apply calibration to get more realistic upload speed
        const calibratedSpeed = calibrateSpeed(
          measuredSpeed,
          speedTestConfig.uploadCalibrationFactor,
          speedTestConfig.maxUploadSpeed
        );
        
        setUploadSpeed(parseFloat(calibratedSpeed.toFixed(2)));
      }
    } catch (error) {
      console.error("Error testing upload speed:", error);
      setUploadSpeed(null);
    }
    
    setProgress(100);
    setTestPhase('complete');
    setIsRunning(false);
    
    // Track test completion in analytics
    trackToolUsage('SpeedTest', 'complete', {
      ping: ping,
      downloadSpeed: downloadSpeed,
      uploadSpeed: uploadSpeed,
      rawPing: rawPing,
      rawDownloadSpeed: rawDownloadSpeed,
      rawUploadSpeed: rawUploadSpeed,
      calibrationFactors: {
        ping: speedTestConfig.pingCalibrationFactor,
        download: speedTestConfig.downloadCalibrationFactor,
        upload: speedTestConfig.uploadCalibrationFactor
      }
    });
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
      
      {/* Advanced info toggle button */}
      {testPhase === 'complete' && (
        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 text-sm flex items-center mx-auto"
          >
            {showAdvanced ? 'Hide' : 'Show'} calibration details
            <svg 
              className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Advanced calibration info */}
      {showAdvanced && testPhase === 'complete' && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg text-sm">
          <h3 className="font-medium mb-2">Calibration Details</h3>
          <p className="text-gray-600 mb-3">
            Speed test results are calibrated to better match real-world speeds. Your network is likely faster than our test server can measure.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <p className="font-medium">Ping</p>
              <p>Raw: {rawPing} ms</p>
              <p>Calibrated: {ping} ms</p>
              <p className="text-xs text-gray-500">Factor: {speedTestConfig.pingCalibrationFactor.toFixed(2)}x</p>
            </div>
            <div>
              <p className="font-medium">Download</p>
              <p>Raw: {rawDownloadSpeed} Mbps</p>
              <p>Calibrated: {downloadSpeed} Mbps</p>
              <p className="text-xs text-gray-500">Factor: {speedTestConfig.downloadCalibrationFactor.toFixed(2)}x</p>
            </div>
            <div>
              <p className="font-medium">Upload</p>
              <p>Raw: {rawUploadSpeed} Mbps</p>
              <p>Calibrated: {uploadSpeed} Mbps</p>
              <p className="text-xs text-gray-500">Factor: {speedTestConfig.uploadCalibrationFactor.toFixed(2)}x</p>
            </div>
          </div>
        </div>
      )}
      
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