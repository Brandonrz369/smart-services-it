import { NextRequest, NextResponse } from 'next/server';

// This is a simple mock API route for the chat functionality
// In a production app, you would replace this with a real AI API integration
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = generateResponse(message);
    
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

// Simple mock response generator - same as in the ChatBot component
function generateResponse(input: string) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('pricing') || lowerInput.includes('cost') || lowerInput.includes('price')) {
    return "Our pricing depends on the specific services you need. For computer repairs, we typically charge between $75-$150/hour depending on complexity. For managed IT services, we offer plans starting at $299/month. Would you like to see our detailed pricing page or speak with a team member?";
  }
  
  if (lowerInput.includes('appointment') || lowerInput.includes('schedule') || lowerInput.includes('book')) {
    return "You can schedule an appointment through our online booking system. Would you like me to direct you to our booking page?";
  }
  
  if (lowerInput.includes('services') || lowerInput.includes('offer')) {
    return "We offer a wide range of IT services including: computer repair, managed IT services, network setup and support, data recovery, mobile device repair, and cloud solutions. Is there a specific service you'd like to know more about?";
  }
  
  if (lowerInput.includes('repair') || lowerInput.includes('fix')) {
    return "We can help diagnose and repair most computer issues, from hardware failures to software problems. Our technicians have experience with all major brands and operating systems. For urgent issues, we also offer emergency support services.";
  }
  
  if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where')) {
    return "We're located at 927 Magnolia Ave #2, Long Beach, CA 90813. We also offer on-site services throughout Long Beach and surrounding areas, as well as remote support options.";
  }
  
  if (lowerInput.includes('hours') || lowerInput.includes('open')) {
    return "Our normal business hours are Monday through Friday from 6AM to 6PM, and Saturday from 6AM to 6PM. We're closed on Sundays. For urgent IT emergencies, we offer 24/7 support for our managed service clients.";
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
    return "You can reach us at (213) 349-6790 or email support@lbcomputerhelp.com. For urgent issues, phone is the quickest way to get assistance.";
  }
  
  return "I'm here to help with questions about our IT services and support. Could you provide more details about what you'd like to know? You can ask about our services, pricing, scheduling, or technical issues.";
}