'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Type for a log entry
interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warn';
  source: string;
  message: string;
  data?: any;
}

// Context for the form logger
interface FormLoggerContextType {
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

// Create context with default values
const FormLoggerContext = createContext<FormLoggerContextType>({
  logs: [],
  addLog: () => {},
  clearLogs: () => {}
});

// Hook to use the form logger
export const useFormLogger = () => useContext(FormLoggerContext);

// Provider component
export function FormLoggerProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  useEffect(() => {
    // Attempt to load logs from localStorage when component mounts
    try {
      const savedLogs = localStorage.getItem('formLoggerLogs');
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } catch (error) {
      console.error('Error loading form logs:', error);
    }
  }, []);
  
  useEffect(() => {
    // Save logs to localStorage when they change
    try {
      localStorage.setItem('formLoggerLogs', JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving form logs:', error);
    }
  }, [logs]);
  
  const addLog = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newEntry: LogEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setLogs(prevLogs => [newEntry, ...prevLogs].slice(0, 100)); // Keep only the latest 100 logs
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <FormLoggerContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </FormLoggerContext.Provider>
  );
}

// Component for displaying logs
export default function FormLogger() {
  const { logs, clearLogs } = useFormLogger();
  const [filter, setFilter] = useState<'all' | 'info' | 'success' | 'error' | 'warn'>('all');
  
  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);
  
  return (
    <div className="bg-white border rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Form Submission Logger</h2>
        <div className="flex items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Logs</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
          </select>
          <button
            onClick={clearLogs}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
          >
            Clear Logs
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No logs found. Submit a form to see logs appear here.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.type === 'info' ? 'bg-blue-100 text-blue-800' :
                      log.type === 'success' ? 'bg-green-100 text-green-800' :
                      log.type === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="max-w-md truncate">{log.message}</div>
                    {log.data && (
                      <details className="mt-1">
                        <summary className="cursor-pointer text-xs text-blue-500 hover:text-blue-700">Show details</summary>
                        <pre className="mt-2 text-xs p-2 bg-gray-50 rounded overflow-x-auto">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}