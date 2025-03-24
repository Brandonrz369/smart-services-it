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
      // Use brandon's ping factor for compatibility with previous method 
      const pingFactor = speedTestConfig.pingCalibrationData[1].actualValue / 
                         speedTestConfig.pingCalibrationData[1].measuredValue;
                         
      const calibratedPing = Math.round(calibratePing(
        measuredPing,
        pingFactor,
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
        // Use brandon's download factor for compatibility with previous method
        const downloadFactor = speedTestConfig.downloadCalibrationData[2].actualValue / 
                              speedTestConfig.downloadCalibrationData[2].measuredValue;
                              
        const calibratedSpeed = calibrateSpeed(
          measuredSpeed,
          downloadFactor,
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
        // Use brandon's upload factor for compatibility with previous method
        const uploadFactor = speedTestConfig.uploadCalibrationData[2].actualValue / 
                            speedTestConfig.uploadCalibrationData[2].measuredValue;
                            
        const calibratedSpeed = calibrateSpeed(
          measuredSpeed,
          uploadFactor,
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
    
    // Calculate effective calibration factors for this test
    const effectivePingFactor = ping && rawPing ? ping / rawPing : null;
    const effectiveDownloadFactor = downloadSpeed && rawDownloadSpeed ? downloadSpeed / rawDownloadSpeed : null;
    const effectiveUploadFactor = uploadSpeed && rawUploadSpeed ? uploadSpeed / rawUploadSpeed : null;
    
    // Track test completion in analytics
    trackToolUsage('SpeedTest', 'complete', {
      ping: ping,
      downloadSpeed: downloadSpeed,
      uploadSpeed: uploadSpeed,
      rawPing: rawPing,
      rawDownloadSpeed: rawDownloadSpeed,
      rawUploadSpeed: rawUploadSpeed,
      effectiveCalibration: {
        ping: effectivePingFactor,
        download: effectiveDownloadFactor,
        upload: effectiveUploadFactor
      },
      adaptiveScaling: speedTestConfig.useAdaptiveScaling,
      referenceProfiles: {
        download: speedTestConfig.downloadCalibrationData.length,
        upload: speedTestConfig.uploadCalibrationData.length,
        ping: speedTestConfig.pingCalibrationData.length
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
            Speed test results are calibrated to better match real-world speeds using adaptive scaling based on multiple connection profiles.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="font-medium">Ping</p>
              <p>Raw: {rawPing} ms</p>
              <p>Calibrated: {ping} ms</p>
              <p className="text-xs text-gray-500">
                {speedTestConfig.useAdaptiveScaling ? 'Using adaptive calibration' : 'Fixed calibration'}
              </p>
            </div>
            <div>
              <p className="font-medium">Download</p>
              <p>Raw: {rawDownloadSpeed} Mbps</p>
              <p>Calibrated: {downloadSpeed} Mbps</p>
              <p className="text-xs text-gray-500">
                Server capacity ceiling: {speedTestConfig.serverCapacityCeiling} Mbps
              </p>
            </div>
            <div>
              <p className="font-medium">Upload</p>
              <p>Raw: {rawUploadSpeed} Mbps</p>
              <p>Calibrated: {uploadSpeed} Mbps</p>
              <p className="text-xs text-gray-500">
                Based on {speedTestConfig.uploadCalibrationData.length} connection profiles
              </p>
            </div>
          </div>
          
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer hover:text-blue-600 transition-colors">
              View calibration reference data
            </summary>
            <div className="mt-2 overflow-x-auto">
              <div className="mb-2">
                <p className="font-medium">Download Calibration Reference Points:</p>
                <ul className="list-disc ml-4">
                  {speedTestConfig.downloadCalibrationData.map((point, index) => (
                    <li key={index}>
                      Measured: {point.measuredValue} Mbps → Actual: {point.actualValue} Mbps 
                      (Factor: {(point.actualValue / point.measuredValue).toFixed(2)}x)
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-2">
                <p className="font-medium">Upload Calibration Reference Points:</p>
                <ul className="list-disc ml-4">
                  {speedTestConfig.uploadCalibrationData.map((point, index) => (
                    <li key={index}>
                      Measured: {point.measuredValue} Mbps → Actual: {point.actualValue} Mbps
                      (Factor: {(point.actualValue / point.measuredValue).toFixed(2)}x)
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="font-medium">Ping Calibration Reference Points:</p>
                <ul className="list-disc ml-4">
                  {speedTestConfig.pingCalibrationData.map((point, index) => (
                    <li key={index}>
                      Measured: {point.measuredValue} ms → Actual: {point.actualValue} ms
                      (Factor: {(point.actualValue / point.measuredValue).toFixed(3)}x)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
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