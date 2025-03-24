'use client';

import React, { useState } from 'react';
import { trackToolUsage } from '@/lib/analytics';

interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
}

interface DomainInfo {
  domain: string;
  ipAddresses: string[];
  records: DNSRecord[];
  whois?: {
    registrar?: string;
    created?: string;
    expires?: string;
    nameservers?: string[];
  };
  loadTime?: number;
}

export default function DomainLookup() {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'dns' | 'whois'>('general');

  const handleLookup = async () => {
    if (!domain) return;
    
    setIsLoading(true);
    setError(null);
    
    // Track domain lookup start
    trackToolUsage('DomainLookup', 'lookup_start', { domain });
    
    try {
      // Simulate API call for domain info with randomized mock data
      const startTime = performance.now();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate a random number of IP addresses (1-3)
      const ipCount = Math.floor(Math.random() * 3) + 1;
      const ipAddresses = Array.from({ length: ipCount }, () => 
        `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      );
      
      // Generate mock DNS records
      const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS'];
      const recordCount = Math.floor(Math.random() * 10) + 3; // 3-12 records
      
      const records: DNSRecord[] = Array.from({ length: recordCount }, () => {
        const type = recordTypes[Math.floor(Math.random() * recordTypes.length)];
        let value = '';
        
        // Generate appropriate value based on record type
        switch (type) {
          case 'A':
            value = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
            break;
          case 'AAAA':
            value = '2001:0db8:85a3:0000:0000:8a2e:0370:7334'.replace(/0000/g, () => 
              Math.floor(Math.random() * 65536).toString(16).padStart(4, '0')
            );
            break;
          case 'MX':
            value = `${Math.floor(Math.random() * 50)} mail-${Math.floor(Math.random() * 10)}.${domain}`;
            break;
          case 'TXT':
            value = `v=spf1 include:_spf.${domain} -all`;
            break;
          case 'CNAME':
            value = `cdn-${Math.floor(Math.random() * 10)}.${domain.split('.').slice(1).join('.')}`;
            break;
          case 'NS':
            value = `ns${Math.floor(Math.random() * 5) + 1}.${['cloudflare.com', 'google.com', 'amazonaws.com'][Math.floor(Math.random() * 3)]}`;
            break;
        }
        
        return {
          type,
          value,
          ttl: Math.floor(Math.random() * 86400)
        };
      });
      
      // Sort records by type for better readability
      records.sort((a, b) => a.type.localeCompare(b.type));
      
      // Generate WHOIS info
      const whois = {
        registrar: ['GoDaddy.com, LLC', 'Namecheap, Inc.', 'Amazon Registrar, Inc.', 'Google Domains'][Math.floor(Math.random() * 4)],
        created: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        expires: new Date(Date.now() + Math.random() * 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nameservers: Array.from({ length: 2 }, (_, i) => `ns${i+1}.${['cloudflare.com', 'google.com', 'amazonaws.com'][Math.floor(Math.random() * 3)]}`)
      };
      
      const endTime = performance.now();
      const loadTime = Math.round((endTime - startTime) / 10) / 100; // Round to 2 decimal places
      
      // Set domain info
      setDomainInfo({
        domain,
        ipAddresses,
        records,
        whois,
        loadTime
      });
      
      // Track successful lookup
      trackToolUsage('DomainLookup', 'lookup_complete', { 
        domain,
        recordCount: records.length,
        ipCount: ipAddresses.length,
        loadTime
      });
    } catch (err) {
      console.error('Domain lookup error:', err);
      setError('Failed to lookup domain information. Please try again.');
      
      // Track error
      trackToolUsage('DomainLookup', 'lookup_error', { 
        domain,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Domain & DNS Lookup</h2>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter a domain name (e.g., example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLookup}
            disabled={isLoading || !domain}
            className={`px-4 py-2 rounded-r-md text-white font-medium ${
              isLoading || !domain
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Looking up...' : 'Lookup'}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
      
      {domainInfo && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Results for {domainInfo.domain}
              <span className="ml-2 text-sm font-normal text-gray-500">
                (Query time: {domainInfo.loadTime}s)
              </span>
            </h3>
            <button
              onClick={() => {
                // Create a blob with domain info as JSON
                const blob = new Blob([JSON.stringify(domainInfo, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                // Create temporary link and trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = `${domainInfo.domain}-dns-info.json`;
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Track download
                trackToolUsage('DomainLookup', 'export_results', { domain: domainInfo.domain });
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Export JSON
            </button>
          </div>
          
          {/* Tab navigation */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex -mb-px">
              <button
                className={`py-2 px-4 ${
                  activeTab === 'general'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('general')}
              >
                General
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === 'dns'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('dns')}
              >
                DNS Records
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === 'whois'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('whois')}
              >
                WHOIS Info
              </button>
            </div>
          </div>
          
          {/* General tab */}
          {activeTab === 'general' && (
            <div>
              <h4 className="font-medium mb-2">Domain Information</h4>
              <div className="mb-4 bg-gray-50 p-3 rounded-md">
                <div className="mb-2">
                  <span className="font-medium">Domain: </span>
                  {domainInfo.domain}
                </div>
                <div>
                  <span className="font-medium">IP Addresses: </span>
                  <ul className="list-disc ml-6">
                    {domainInfo.ipAddresses.map((ip, index) => (
                      <li key={index}>{ip}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">DNS Summary</h4>
              <div className="mb-4 bg-gray-50 p-3 rounded-md">
                <div className="mb-2">
                  <span className="font-medium">Total Records: </span>
                  {domainInfo.records.length}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Record Types: </span>
                  {Array.from(new Set(domainInfo.records.map(r => r.type))).join(', ')}
                </div>
                <div>
                  <span className="font-medium">Nameservers: </span>
                  {domainInfo.whois?.nameservers?.join(', ')}
                </div>
              </div>
            </div>
          )}
          
          {/* DNS Records tab */}
          {activeTab === 'dns' && (
            <div>
              <h4 className="font-medium mb-2">DNS Records</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 rounded-md">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Type</th>
                      <th className="py-2 px-4 text-left">Value</th>
                      <th className="py-2 px-4 text-left">TTL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domainInfo.records.map((record, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 font-medium">{record.type}</td>
                        <td className="py-2 px-4 font-mono text-sm">
                          {record.value}
                        </td>
                        <td className="py-2 px-4">
                          {record.ttl} seconds
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* WHOIS tab */}
          {activeTab === 'whois' && (
            <div>
              <h4 className="font-medium mb-2">WHOIS Information</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="mb-2">
                  <span className="font-medium">Registrar: </span>
                  {domainInfo.whois?.registrar}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Creation Date: </span>
                  {domainInfo.whois?.created}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Expiration Date: </span>
                  {domainInfo.whois?.expires}
                </div>
                <div>
                  <span className="font-medium">Nameservers: </span>
                  <ul className="list-disc ml-6">
                    {domainInfo.whois?.nameservers?.map((ns, index) => (
                      <li key={index}>{ns}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                <p>
                  <strong>Note:</strong> This is a demonstration with simulated WHOIS data. 
                  For complete and accurate WHOIS information, please use official WHOIS services.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}