"use client";

import React, { useState, useCallback } from "react"; // Added useCallback
import { trackToolUsage } from "@/lib/analytics";

interface PingResult {
  host: string;
  status: "success" | "error";
  time?: number;
  error?: string;
}

interface TracerouteHop {
  hop: number;
  host: string;
  time: number;
}

interface PortScanResult {
  port: number;
  status: "Open" | "Closed" | "Filtered";
}

export default function NetworkTools() {
  const [pingHost, setPingHost] = useState("");
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [isPinging, setIsPinging] = useState(false);

  const [dnsHost, setDnsHost] = useState("");
  const [dnsResult, setDnsResult] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const [tracerouteHost, setTracerouteHost] = useState("");
  const [tracerouteResults, setTracerouteResults] = useState<TracerouteHop[]>(
    [],
  );
  const [isTracing, setIsTracing] = useState(false);

  // Port Scanner State
  const [scanHost, setScanHost] = useState("");
  const [scanPorts, setScanPorts] = useState("80, 443, 22, 21, 25, 110, 143, 8080"); // Default common ports
  const [scanResults, setScanResults] = useState<PortScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const handlePing = async () => {
    if (!pingHost) return;

    setIsPinging(true);
    // Track start in analytics
    trackToolUsage("NetworkTools", "ping_start", { host: pingHost });

    const pingTime = Math.floor(Math.random() * 100) + 10; // Simulate ping time between 10-110ms
    setPingResults((prev) => [
      ...prev,
      {
        host: pingHost,
        status: "success",
        time: pingTime,
      },
    ]);

    // Track completion in analytics
    trackToolUsage("NetworkTools", "ping_complete", {
      host: pingHost,
      time: pingTime,
    });

    setIsPinging(false);
  };

  const handleDnsLookup = async () => {
    if (!dnsHost) return;

    setIsLookingUp(true);
    // Track start in analytics
    trackToolUsage("NetworkTools", "dns_lookup_start", { domain: dnsHost });

    try {
      // Simulated DNS lookup
      setTimeout(() => {
        // Generate random IP
        const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        setDnsResult(ip);

        // Track completion in analytics
        trackToolUsage("NetworkTools", "dns_lookup_complete", {
          domain: dnsHost,
          result: ip,
        });

        setIsLookingUp(false);
      }, 500);
    } catch {
      setDnsResult("Lookup failed");

      // Track failure in analytics
      trackToolUsage("NetworkTools", "dns_lookup_failed", {
        domain: dnsHost,
      });

      setIsLookingUp(false);
    }
  };

  const handleTraceroute = async () => {
    if (!tracerouteHost) return;

    setIsTracing(true);
    setTracerouteResults([]);

    // Track start in analytics
    trackToolUsage("NetworkTools", "traceroute_start", {
      host: tracerouteHost,
    });

    // Simulate traceroute with random hops
    const hops = Math.floor(Math.random() * 8) + 3; // 3-10 hops

    const results: TracerouteHop[] = [];
    for (let i = 1; i <= hops; i++) {
      // Simulate each hop taking some time
      await new Promise((resolve) => setTimeout(resolve, 300));

      results.push({
        hop: i,
        host:
          i === hops
            ? tracerouteHost
            : `router-${Math.floor(Math.random() * 100)}.network.com`,
        time: Math.floor(Math.random() * 100) + 10,
      });

      setTracerouteResults([...results]);
    }

    // Track completion in analytics
    trackToolUsage("NetworkTools", "traceroute_complete", {
      host: tracerouteHost,
      hops: hops,
    });

    setIsTracing(false);
  };

  const clearPingResults = () => {
    setPingResults([]);
  };

  const clearTracerouteResults = () => {
    setTracerouteResults([]);
  };

  // Port Scanner Logic
  const parsePorts = (portsInput: string): number[] | null => {
    const ports: number[] = [];
    const parts = portsInput.split(',');

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.includes('-')) {
        const [startStr, endStr] = trimmedPart.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > 65535 || start > end) {
          return null; // Invalid range
        }
        for (let i = start; i <= end; i++) {
          ports.push(i);
        }
      } else {
        const port = parseInt(trimmedPart, 10);
        if (isNaN(port) || port < 1 || port > 65535) {
          return null; // Invalid port
        }
        ports.push(port);
      }
    }
    // Remove duplicates and sort
    return [...new Set(ports)].sort((a, b) => a - b);
  };

  const handlePortScan = useCallback(async () => {
    if (!scanHost || !scanPorts) return;

    setIsScanning(true);
    setScanResults([]);
    setScanError(null);
    trackToolUsage("NetworkTools", "port_scan_start", { host: scanHost, ports: scanPorts });

    const portsToScan = parsePorts(scanPorts);

    if (!portsToScan) {
      setScanError("Invalid port format. Use comma-separated numbers or ranges (e.g., 80, 443, 1000-1024). Ports must be between 1 and 65535.");
      setIsScanning(false);
      trackToolUsage("NetworkTools", "port_scan_error", { host: scanHost, error: "Invalid port format" });
      return;
    }

    if (portsToScan.length > 1000) { // Limit scan size for simulation
       setScanError("Too many ports specified for simulation (max 1000). Please narrow your range.");
       setIsScanning(false);
       trackToolUsage("NetworkTools", "port_scan_error", { host: scanHost, error: "Too many ports" });
       return;
    }


    const results: PortScanResult[] = [];
    const commonOpenPorts = [80, 443, 22, 21, 25, 110, 143, 8080, 3389, 53];

    for (const port of portsToScan) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Simulate scan delay

      let status: "Open" | "Closed" | "Filtered";
      if (commonOpenPorts.includes(port)) {
        status = Math.random() > 0.3 ? "Open" : "Closed"; // Higher chance of being open
      } else {
        const rand = Math.random();
        status = rand < 0.1 ? "Open" : (rand < 0.8 ? "Closed" : "Filtered"); // Lower chance of being open
      }

      results.push({ port, status });
      setScanResults([...results]); // Update incrementally
    }

     trackToolUsage("NetworkTools", "port_scan_complete", {
       host: scanHost,
       ports_scanned: portsToScan.length,
       open_ports: results.filter(r => r.status === 'Open').length
     });

    setIsScanning(false);
  }, [scanHost, scanPorts]); // Added dependencies

  const clearScanResults = () => {
    setScanResults([]);
    setScanError(null);
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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
                  {result.status === "success"
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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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

      {/* Port Scanner Tool */}
      <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Port Scanner</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={scanHost}
            onChange={(e) => setScanHost(e.target.value)}
            placeholder="Enter hostname or IP"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={scanPorts}
            onChange={(e) => setScanPorts(e.target.value)}
            placeholder="Ports (e.g., 80, 443, 1000-1024)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePortScan}
            disabled={isScanning || !scanHost || !scanPorts}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isScanning || !scanHost || !scanPorts
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Scan Ports
          </button>
        </div>

        {isScanning && (
          <div className="text-sm text-gray-600 mb-2">
            Scanning ports on {scanHost}...
          </div>
        )}

        {scanError && (
           <div className="mb-2 p-3 bg-red-100 text-red-700 text-sm rounded-md">
             Error: {scanError}
           </div>
         )}

        {scanResults.length > 0 && (
          <>
            <div className="max-h-64 overflow-y-auto mb-2 font-mono text-sm bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-3 font-semibold mb-2">
                <div className="col-span-1">Port</div>
                <div className="col-span-2">Status</div>
              </div>
              {scanResults.map((result, index) => (
                <div key={index} className="grid grid-cols-3 mb-1">
                  <div className="col-span-1">{result.port}</div>
                  <div className={`col-span-2 font-medium ${
                    result.status === 'Open' ? 'text-green-600' :
                    result.status === 'Closed' ? 'text-red-600' :
                    'text-yellow-600' // Filtered
                  }`}>
                    {result.status}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={clearScanResults}
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
