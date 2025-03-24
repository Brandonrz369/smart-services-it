'use client';

import React, { useState } from 'react';

interface PingResult {
  host: string;
  status: 'success' | 'error';
  time?: number;
  error?: string;
}

interface TracerouteHop {
  hop: number;
  host: string;
  time: number;
}

export default function NetworkTools() {
  const [pingHost, setPingHost] = useState('');
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  
  const [dnsHost, setDnsHost] = useState('');
  const [dnsResult, setDnsResult] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  
  const [tracerouteHost, setTracerouteHost] = useState('');
  const [tracerouteResults, setTracerouteResults] = useState<TracerouteHop[]>([]);
  const [isTracing, setIsTracing] = useState(false);

  const handlePing = async () => {
    if (!pingHost) return;
    
    setIsPinging(true);
    setPingResults(prev => [...prev, {
      host: pingHost,
      status: 'success',
      time: Math.floor(Math.random() * 100) + 10 // Simulate ping time between 10-110ms
    }]);
    setIsPinging(false);
  };
  
  const handleDnsLookup = async () => {
    if (!dnsHost) return;
    
    setIsLookingUp(true);
    
    try {
      // Simulated DNS lookup
      setTimeout(() => {
        // Generate random IP
        const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        setDnsResult(ip);
        setIsLookingUp(false);
      }, 500);
    } catch {
      setDnsResult('Lookup failed');
      setIsLookingUp(false);
    }
  };
  
  const handleTraceroute = async () => {
    if (!tracerouteHost) return;
    
    setIsTracing(true);
    setTracerouteResults([]);
    
    // Simulate traceroute with random hops
    const hops = Math.floor(Math.random() * 8) + 3; // 3-10 hops
    
    const results: TracerouteHop[] = [];
    for (let i = 1; i <= hops; i++) {
      // Simulate each hop taking some time
      await new Promise(resolve => setTimeout(resolve, 300));
      
      results.push({
        hop: i,
        host: i === hops 
          ? tracerouteHost 
          : `router-${Math.floor(Math.random() * 100)}.network.com`,
        time: Math.floor(Math.random() * 100) + 10
      });
      
      setTracerouteResults([...results]);
    }
    
    setIsTracing(false);
  };

  const clearPingResults = () => {
    setPingResults([]);
  };
  
  const clearTracerouteResults = () => {
    setTracerouteResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Ping Tool */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Ping Test</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={pingHost}
            onChange={(e) => setPingHost(e.target.value)}
            placeholder="Enter hostname or IP"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePing}
            disabled={isPinging || !pingHost}
            className={`px-4 py-2 rounded-r-md text-white font-medium ${
              isPinging || !pingHost
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Ping
          </button>
        </div>
        
        {pingResults.length > 0 && (
          <>
            <div className="max-h-64 overflow-y-auto mb-2 font-mono text-sm bg-gray-50 p-3 rounded">
              {pingResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result.status === 'success' 
                    ? `PING ${result.host}: time=${result.time}ms` 
                    : `PING ${result.host}: failed - ${result.error}`}
                </div>
              ))}
            </div>
            <button
              onClick={clearPingResults}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear Results
            </button>
          </>
        )}
      </div>
      
      {/* DNS Lookup Tool */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">DNS Lookup</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={dnsHost}
            onChange={(e) => setDnsHost(e.target.value)}
            placeholder="Enter domain name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleDnsLookup}
            disabled={isLookingUp || !dnsHost}
            className={`px-4 py-2 rounded-r-md text-white font-medium ${
              isLookingUp || !dnsHost 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Lookup
          </button>
        </div>
        
        {dnsResult && (
          <div className="font-mono text-sm bg-gray-50 p-3 rounded">
            <div className="mb-1">
              <span className="font-semibold">Domain:</span> {dnsHost}
            </div>
            <div>
              <span className="font-semibold">IP Address:</span> {dnsResult}
            </div>
          </div>
        )}
      </div>
      
      {/* Traceroute Tool */}
      <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Traceroute</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={tracerouteHost}
            onChange={(e) => setTracerouteHost(e.target.value)}
            placeholder="Enter hostname or IP"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleTraceroute}
            disabled={isTracing || !tracerouteHost}
            className={`px-4 py-2 rounded-r-md text-white font-medium ${
              isTracing || !tracerouteHost
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Trace
          </button>
        </div>
        
        {isTracing && (
          <div className="text-sm text-gray-600 mb-2">
            Tracing route to {tracerouteHost}...
          </div>
        )}
        
        {tracerouteResults.length > 0 && (
          <>
            <div className="max-h-64 overflow-y-auto mb-2 font-mono text-sm bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-12 font-semibold mb-2">
                <div className="col-span-1">Hop</div>
                <div className="col-span-9">Host</div>
                <div className="col-span-2">Time</div>
              </div>
              {tracerouteResults.map((hop, index) => (
                <div key={index} className="grid grid-cols-12 mb-1">
                  <div className="col-span-1">{hop.hop}</div>
                  <div className="col-span-9">{hop.host}</div>
                  <div className="col-span-2">{hop.time} ms</div>
                </div>
              ))}
            </div>
            <button
              onClick={clearTracerouteResults}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear Results
            </button>
          </>
        )}
      </div>
    </div>
  );
}