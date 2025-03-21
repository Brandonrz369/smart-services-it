import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to log file
const LOG_FILE = path.join(process.cwd(), 'form-submissions-log.json');

// Endpoint to get logs
export async function GET() {
  try {
    if (!fs.existsSync(LOG_FILE)) {
      return NextResponse.json({ logs: [] });
    }
    
    const data = fs.readFileSync(LOG_FILE, 'utf8');
    const logs = JSON.parse(data);
    
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error getting logs:', error);
    return NextResponse.json({ error: 'Error getting logs', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// Endpoint to clear logs
export async function DELETE() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      fs.writeFileSync(LOG_FILE, JSON.stringify({ logs: [] }), 'utf8');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing logs:', error);
    return NextResponse.json({ error: 'Error clearing logs' }, { status: 500 });
  }
}