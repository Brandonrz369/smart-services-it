'use client';

import React, { useEffect, useState } from 'react';
import { getToolUsageStats } from '@/lib/analytics';

interface AnalyticsStats {
  totalEvents: number;
  toolCounts: Record<string, number>;
  actionCounts: Record<string, number>;
  firstEventTime: Date | null;
  lastEventTime: Date | null;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get analytics data
    const analyticsData = getToolUsageStats();
    setStats(analyticsData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Web Tools Analytics</h1>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Web Tools Analytics</h1>
        <div className="bg-yellow-50 p-4 rounded-lg mb-8">
          <p className="text-yellow-800">No analytics data found. Users need to interact with the web tools to generate data.</p>
        </div>
      </div>
    );
  }

  // Get sorted tools by usage
  const sortedTools = Object.entries(stats.toolCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tool, count]) => ({ tool, count }));

  // Get top actions by count
  const topActions = Object.entries(stats.actionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([action, count]) => ({ action, count }));

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Web Tools Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Events</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalEvents}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">First Tracked Event</h2>
          <p className="text-lg">
            {stats.firstEventTime 
              ? new Date(stats.firstEventTime).toLocaleString() 
              : 'N/A'}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Last Tracked Event</h2>
          <p className="text-lg">
            {stats.lastEventTime 
              ? new Date(stats.lastEventTime).toLocaleString() 
              : 'N/A'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tool Usage</h2>
          
          {sortedTools.length > 0 ? (
            <ul className="space-y-3">
              {sortedTools.map(({ tool, count }, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="font-medium">{tool}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(count / stats.totalEvents) * 100}%` }} 
                      />
                    </div>
                    <span className="text-gray-600">{count}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tool usage data available</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Actions</h2>
          
          {topActions.length > 0 ? (
            <ul className="space-y-3">
              {topActions.map(({ action, count }, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="font-medium">{action}</span>
                  <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-sm">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No action data available</p>
          )}
        </div>
      </div>
    </div>
  );
}