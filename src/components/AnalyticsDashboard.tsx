'use client';

import React, { useState, useEffect } from 'react';
import { getToolUsageStats } from '@/lib/analytics';

interface UsageData {
  totalEvents: number;
  toolCounts: Record<string, number>;
  actionCounts: Record<string, number>;
  firstEventTime: Date | null;
  lastEventTime: Date | null;
}

export default function AnalyticsDashboard() {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'all'>('all');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    // Get usage stats
    const stats = getToolUsageStats();
    if (stats) {
      setUsageData(stats);
    }

    // Set up refresh interval
    const interval = setInterval(() => {
      const refreshedStats = getToolUsageStats();
      if (refreshedStats) {
        setUsageData(refreshedStats);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getFilteredData = () => {
    if (!usageData) return null;

    // Filter by time range if needed
    let filteredData = { ...usageData };
    
    if (timeRange !== 'all' && typeof window !== 'undefined') {
      const now = new Date();
      let cutoffTime: Date;
      
      switch (timeRange) {
        case 'day':
          cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'week':
          cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffTime = new Date(0);
      }
      
      // Get stored events to filter by date
      const eventsStr = localStorage.getItem('toolUsageEvents');
      if (eventsStr) {
        try {
          const events = JSON.parse(eventsStr);
          const filteredEvents = events.filter((event: any) => new Date(event.timestamp) > cutoffTime);
          
          // Recalculate counts
          const toolCounts: Record<string, number> = {};
          const actionCounts: Record<string, number> = {};
          
          filteredEvents.forEach((event: any) => {
            toolCounts[event.tool] = (toolCounts[event.tool] || 0) + 1;
            
            const actionKey = `${event.tool}:${event.action}`;
            actionCounts[actionKey] = (actionCounts[actionKey] || 0) + 1;
          });
          
          filteredData = {
            totalEvents: filteredEvents.length,
            toolCounts,
            actionCounts,
            firstEventTime: filteredEvents.length > 0 ? new Date(filteredEvents[filteredEvents.length - 1].timestamp) : null,
            lastEventTime: filteredEvents.length > 0 ? new Date(filteredEvents[0].timestamp) : null
          };
        } catch (e) {
          console.error('Error filtering events by time range:', e);
        }
      }
    }
    
    return filteredData;
  };

  const getChartData = () => {
    const data = getFilteredData();
    if (!data) return null;
    
    const toolColors: Record<string, string> = {
      SeoAnalyzer: '#3b82f6', // blue
      SecurityScanner: '#ef4444', // red
      FormDebugger: '#f97316', // orange
      FormLogger: '#8b5cf6', // purple
      SpeedTest: '#10b981', // green
      NetworkTools: '#6366f1', // indigo
      ColorGenerator: '#ec4899', // pink
      PasswordGenerator: '#f59e0b', // amber
      DomainLookup: '#14b8a6', // teal
      ImageCompressor: '#6b7280', // gray
    };

    const getColor = (tool: string) => {
      return toolColors[tool] || '#9ca3af'; // default gray
    };
    
    // For the tool distribution chart
    const toolDistribution = Object.entries(data.toolCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count, descending
      .map(([tool, count]) => ({
        tool,
        count,
        color: getColor(tool),
        percentage: Math.round((count / data.totalEvents) * 100),
      }));
      
    // For the tool actions chart
    const actionsByTool = selectedTool ? Object.entries(data.actionCounts)
      .filter(([key]) => key.startsWith(`${selectedTool}:`))
      .map(([key, count]) => ({
        action: key.split(':')[1],
        count,
      }))
      .sort((a, b) => b.count - a.count) : [];
      
    return {
      toolDistribution,
      actionsByTool
    };
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleString();
  };

  const chartData = getChartData();
  const filteredData = getFilteredData();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tools Usage Analytics</h2>
        
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Time</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>
      
      {!filteredData ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No usage data available. Start using tools to track analytics.</p>
        </div>
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Tool Usage</h3>
              <p className="text-3xl font-bold">{filteredData.totalEvents}</p>
              <p className="text-sm text-gray-500 mt-2">
                First use: {formatDate(filteredData.firstEventTime)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Unique Tools Used</h3>
              <p className="text-3xl font-bold">{Object.keys(filteredData.toolCounts).length}</p>
              <p className="text-sm text-gray-500 mt-2">
                Most popular: {Object.entries(filteredData.toolCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Last Activity</h3>
              <p className="text-lg font-bold">{formatDate(filteredData.lastEventTime)}</p>
              <p className="text-sm text-gray-500 mt-2">
                Latest action: {
                  Object.entries(filteredData.actionCounts)
                    .sort((a, b) => {
                      // Get the action names
                      const actionA = a[0].split(':')[1];
                      const actionB = b[0].split(':')[1];
                      return actionA.localeCompare(actionB);
                    })[0]?.[0].split(':')[1] || 'N/A'
                }
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
            {/* Tool Distribution Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium mb-4">Tool Usage Distribution</h3>
              
              {chartData && chartData.toolDistribution.length > 0 ? (
                <div>
                  {chartData.toolDistribution.map((item) => (
                    <div 
                      key={item.tool}
                      className="mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      onClick={() => setSelectedTool(selectedTool === item.tool ? null : item.tool)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className={`font-medium ${selectedTool === item.tool ? 'text-blue-600' : ''}`}>
                            {item.tool}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No usage data available.</p>
                </div>
              )}
            </div>
            
            {/* Tool Actions Chart */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium mb-4">
                {selectedTool ? `${selectedTool} Actions` : 'Select a tool to see actions'}
              </h3>
              
              {selectedTool && chartData && chartData.actionsByTool.length > 0 ? (
                <div className="space-y-3">
                  {chartData.actionsByTool.map((item) => (
                    <div key={item.action} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{item.action}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round((item.count / (filteredData.toolCounts[selectedTool] || 1)) * 100)}% of {selectedTool} usage
                          </p>
                        </div>
                        <span className="text-lg font-bold">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    {selectedTool 
                      ? 'No actions recorded for this tool yet.'
                      : 'Click on a tool from the chart to see detailed actions.'}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Usage Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-4">Usage Timeline</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tool
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {typeof window !== 'undefined' && localStorage.getItem('toolUsageEvents') && (
                    (() => {
                      try {
                        const rawEvents = JSON.parse(localStorage.getItem('toolUsageEvents') || '[]');
                        
                        // Apply time filter
                        let events = [...rawEvents];
                        if (timeRange !== 'all') {
                          const now = new Date();
                          let cutoffTime: Date;
                          
                          switch (timeRange) {
                            case 'day':
                              cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                              break;
                            case 'week':
                              cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                              break;
                            case 'month':
                              cutoffTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                              break;
                            default:
                              cutoffTime = new Date(0);
                          }
                          
                          events = events.filter(event => new Date(event.timestamp) > cutoffTime);
                        }
                        
                        // Apply tool filter
                        if (selectedTool) {
                          events = events.filter(event => event.tool === selectedTool);
                        }
                        
                        // Show only the first 10 events to avoid overloading
                        return events.slice(0, 10).map((event: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {event.tool}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.action}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.metadata ? (
                                <details className="cursor-pointer">
                                  <summary className="text-blue-600 hover:text-blue-800">View details</summary>
                                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto max-w-xs">
                                    <pre>{JSON.stringify(event.metadata, null, 2)}</pre>
                                  </div>
                                </details>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ));
                      } catch (e) {
                        console.error('Error parsing events:', e);
                        return (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                              Error loading event data.
                            </td>
                          </tr>
                        );
                      }
                    })()
                  )}
                  
                  {(!localStorage.getItem('toolUsageEvents') || JSON.parse(localStorage.getItem('toolUsageEvents') || '[]').length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No usage events recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}