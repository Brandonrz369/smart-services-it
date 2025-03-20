import { NextRequest, NextResponse } from 'next/server';

// Context information about LB Computer Help to feed to the AI
const COMPANY_CONTEXT = `
About LB Computer Help:
- LB Computer Help is an IT support and computer repair company in Long Beach, CA
- Address: 927 Magnolia Ave #2, Long Beach, CA 90813
- Phone: (213) 349-6790
- Email: support@lbcomputerhelp.com
- Hours: Monday-Friday 6AM-6PM, Saturday 6AM-6PM, Sunday Closed
- Website: https://lbcomputerhelp.com

Services offered:
1. Computer and Laptop Repair ($75-150/hour)
   - Hardware diagnostics and repair
   - Software troubleshooting
   - Virus and malware removal
   - Data recovery
   - Screen replacement
   - Hardware upgrades

2. Managed IT Services (Starting at $299/month)
   - Remote monitoring and maintenance
   - Security management
   - Business continuity planning
   - Cloud services management
   - 24/7 support for business clients
   - Strategic IT consulting

3. Mobile Device Repair
   - Screen and glass repairs
   - Battery replacement
   - Charging port fixes
   - Data recovery and transfer

4. Network and Server Solutions
   - Network setup and maintenance
   - Server management
   - VPN and remote access setup
   - Microsoft 365 implementation

5. On-site Support
   - Available throughout Long Beach and Los Angeles County
   - Emergency services available
   - Same-day appointments when possible

Booking information:
- Clients can book online through the website's booking system
- Emergency support is available by calling (213) 349-6790
- Online booking uses Calendly scheduling
`;

// Configure and select the AI provider based on environment variables
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

// Use the selected AI provider to generate a response
async function getAIResponse(message: string) {
  // Check if we're in development mode - use mock responses to save API costs
  if (process.env.NODE_ENV === 'development') {
    return getMockResponse(message);
  }
  
  try {
    // Based on the configured provider, call the appropriate API
    if (AI_PROVIDER === 'anthropic' && ANTHROPIC_API_KEY) {
      return await getAnthropicResponse(message);
    } else if (AI_PROVIDER === 'openai' && OPENAI_API_KEY) {
      return await getOpenAIResponse(message);
    } else {
      console.warn('No valid AI provider configured. Using mock responses.');
      return getMockResponse(message);
    }
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response');
  }
}

// Function to call Claude API by Anthropic
async function getAnthropicResponse(message: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for LB Computer Help, an IT support and computer repair business. 
          You help website visitors with information about our services, scheduling, and basic technical advice. 
          Be friendly, professional, and concise. Use these details about our business:
          
          ${COMPANY_CONTEXT}
          
          Keep responses under 3 sentences when possible. If you don't know something, suggest the visitor call or email us.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Function to call OpenAI API
async function getOpenAIResponse(message: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for LB Computer Help, an IT support and computer repair business. 
          You help website visitors with information about our services, scheduling, and basic technical advice. 
          Be friendly, professional, and concise. Use these details about our business:
          
          ${COMPANY_CONTEXT}
          
          Keep responses under 3 sentences when possible. If you don't know something, suggest the visitor call or email us.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Fallback function for mock responses
function getMockResponse(input: string) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('pricing') || lowerInput.includes('cost') || lowerInput.includes('price')) {
    return "Our pricing depends on the specific services you need. For computer repairs, we typically charge between $75-$150/hour depending on complexity. For managed IT services, we offer plans starting at $299/month.";
  }
  
  if (lowerInput.includes('appointment') || lowerInput.includes('schedule') || lowerInput.includes('book')) {
    return "You can schedule an appointment through our online booking system on our website. Would you like me to direct you to our booking page?";
  }
  
  if (lowerInput.includes('services') || lowerInput.includes('offer')) {
    return "We offer computer repair, managed IT services, network setup, data recovery, mobile device repair, and cloud solutions. Is there a specific service you'd like to know more about?";
  }
  
  if (lowerInput.includes('repair') || lowerInput.includes('fix')) {
    return "We can diagnose and repair most computer issues, including hardware failures and software problems. Our technicians are experienced with all major brands and operating systems.";
  }
  
  if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where')) {
    return "We're located at 927 Magnolia Ave #2, Long Beach, CA 90813. We also offer on-site services throughout Long Beach and Los Angeles County.";
  }
  
  if (lowerInput.includes('hours') || lowerInput.includes('open')) {
    return "Our business hours are Monday through Friday from 6AM to 6PM, and Saturday from 6AM to 6PM. We're closed on Sundays.";
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
    return "You can reach us at (213) 349-6790 or email support@lbcomputerhelp.com. For urgent issues, phone is the quickest way to get assistance.";
  }
  
  return "I'm here to help with questions about our IT services and support. You can ask about our services, pricing, scheduling, or get basic technical advice.";
}

// Main API handler
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    // Get response from AI (or mock in development)
    const response = await getAIResponse(message);
    
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message. Please try again later.' },
      { status: 500 }
    );
  }
}