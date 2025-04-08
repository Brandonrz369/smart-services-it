"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatHistoryRef = useRef<Message[]>([]);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        text: "👋 Hi there! I'm the LB Computer Help AI assistant. I can answer questions about our services, help troubleshoot common tech issues, or schedule a consultation with our experts. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const userInput = inputText.trim();

    // Add user message
    const userMessage: Message = {
      text: userInput,
      sender: "user",
      timestamp: new Date(),
    };

    // Update UI with user message
    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      chatHistoryRef.current = newMessages;
      return newMessages;
    });

    setInputText("");
    setIsTyping(true);

    // Auto-fallback responses for quick replies to common questions
    const quickResponses: Record<string, string> = {
      // Greetings
      hi: "Hello! I'm the LB Computer Help support assistant. How can I help you today?",
      hello:
        "Hello! I'm the LB Computer Help support assistant. How can I help you today?",
      hey: "Hello! I'm the LB Computer Help support assistant. How can I help you today?",
      "good morning":
        "Good morning! I'm the LB Computer Help support assistant. How can I help you today?",
      "good afternoon":
        "Good afternoon! I'm the LB Computer Help support assistant. How can I help you today?",
      "good evening":
        "Good evening! I'm the LB Computer Help support assistant. How can I help you today?",

      // General info
      help: "I can help with information about our IT services, pricing, scheduling appointments, and basic technical advice. What do you need assistance with?",
      "who are you":
        "I'm the LB Computer Help AI assistant. I can provide information about our services, help troubleshoot common issues, or schedule a consultation. How can I assist you today?",
      about:
        "LB Computer Help is a leading IT support and computer services company in Long Beach, CA. We've been serving businesses and individuals since 2010 with a wide range of tech services.",

      // Services
      services:
        "We offer computer services, managed IT services, network setup & support, data accessibility consultation, mobile device assistance, and cloud solutions. Which service are you interested in?",
      "computer services":
        "Our computer services include hardware diagnostics, software troubleshooting, security cleanup assistance, screen assessment, and hardware configuration. Our technicians are certified and experienced with all major brands.",
      "laptop services":
        "We offer comprehensive laptop services including screen assessment, keyboard assistance, battery replacement, security cleanup, data accessibility consultation, and performance optimization.",
      "security cleanup":
        "Our security cleanup assistance includes thorough system scanning, help addressing malicious software, system cleanup, and security recommendations to prevent future infections.",
      "data accessibility":
        "Our data accessibility consultations can help explore options for retrieving lost files from corrupted drives, accidentally formatted storage, and potentially damaged devices. We have specialized tools and methods.",
      network:
        "Our networking services include setup and troubleshooting for home and business networks, WiFi optimization, network security, and VPN configuration.",
      cloud:
        "We offer cloud services including Microsoft 365 implementation, cloud backup solutions, cloud migration, and ongoing cloud infrastructure management.",
      "managed it":
        "Our managed IT services include 24/7 monitoring, regular maintenance, security management, help desk support, and strategic IT planning for a fixed monthly fee.",
      "mobile assistance":
        "We provide assistance for smartphones and tablets, including screen assessment, battery service, charging port solutions, and data consultation/transfer between devices.",

      // Pricing
      pricing:
        "Our computer services range from $75-150/hour depending on complexity. Managed IT services start at $299/month. Data accessibility consultations start at $150. Would you like pricing for a specific service?",
      rates:
        "Our standard rate for computer services is $75-150/hour depending on the complexity. For businesses, we offer managed IT packages starting at $299/month for up to 10 devices.",
      cost: "Our services start at $75/hour for basic computer assistance. For businesses, we recommend our managed IT packages which provide comprehensive support starting at $299/month.",

      // Booking
      appointment:
        "You can schedule an appointment through our online booking system at lbcomputerhelp.com/book, or call us at (213) 349-6790. Would you like me to direct you to our booking page?",
      schedule:
        "To schedule an appointment, you can use our online booking system or call (213) 349-6790. We typically offer same-day appointments for urgent issues.",
      book: "You can book an appointment through our website at lbcomputerhelp.com/book or call our office at (213) 349-6790. For urgent matters, calling is recommended.",
      urgent:
        "For urgent IT issues, please call us directly at (213) 349-6790. We offer emergency support and can often provide same-day service.",

      // Contact
      phone:
        "You can reach us by phone at (213) 349-6790 during our business hours: Monday-Friday 6AM-6PM and Saturday 6AM-6PM.",
      email:
        "You can email us at support@lbcomputerhelp.com. We typically respond to all inquiries within 1 business hour during operating hours.",
      contact:
        "The best ways to contact us are by phone at (213) 349-6790 or email at support@lbcomputerhelp.com. For urgent matters, calling is recommended.",
      location:
        "We're located at 927 Magnolia Ave #2, Long Beach, CA 90813. We also offer on-site services throughout Long Beach and Los Angeles County.",
      address:
        "Our office is located at 927 Magnolia Ave #2, Long Beach, CA 90813. We're easily accessible from downtown Long Beach and provide service throughout the LA metro area.",
      hours:
        "Our business hours are Monday-Friday 6AM-6PM and Saturday 6AM-6PM. We're closed on Sundays.",
    };

    try {
      let responseText = "";

      // Check for quick responses first
      const lowerInput = userInput.toLowerCase().trim();

      // Special test commands to force API call
      if (lowerInput === "testapi" || lowerInput.includes("forceapi")) {
        // Force API call to test OpenAI connection
        console.log("Forcing API call test");
      }
      // Skip pattern matching for complex questions (longer than 80 characters)
      else if (userInput.length > 80) {
        console.log("Question too complex for quick responses, using AI API");
      }
      // Check for exact matches first
      else if (quickResponses[lowerInput]) {
        responseText = quickResponses[lowerInput];
      } else {
        // Check if this is a question about a specific technology topic
        const complexTopics = [
          "zero-trust",
          "zero trust",
          "security model",
          "infrastructure",
          "implementation steps",
          "challenges",
        ];
        const isComplexTopic = complexTopics.some((topic) =>
          lowerInput.includes(topic),
        );

        if (isComplexTopic) {
          console.log("Detected complex technical topic, using AI API");
        } else {
          // Check for partial matches with word boundaries (only for simple queries)
          for (const [key, response] of Object.entries(quickResponses)) {
            // Check if the key is a whole word within the input (surrounded by spaces or at the beginning/end)
            // But only if the key is a significant part of the question (to avoid matching just 'cloud' in a complex question)
            const keyPattern = new RegExp(
              `(^|\\s)${key}(\\s|$|\\?|\\.|,)`,
              "i",
            );
            if (
              keyPattern.test(lowerInput) &&
              key.length > 3 &&
              lowerInput.length / key.length < 5
            ) {
              responseText = response;
              break;
            }
          }

          // If still no match, check for similar words (like plurals, etc.)
          if (!responseText) {
            const similarMatches = {
              services: ["service", "offering", "offerings"],
              pricing: ["price", "prices", "charge", "charges", "fee", "fees"],
              hours: ["hour", "time", "schedule", "open", "closed", "closing"],
              appointment: [
                "appointments",
                "booking",
                "bookings",
                "reservation",
                "reservations",
              ],
              contact: ["reach", "call", "calling", "contacting"],
              location: ["located", "office", "address", "where"],
              network: [
                "networking",
                "wifi",
                "internet",
                "connection",
                "router",
              ],
            };

            // Only use this for short queries
            if (lowerInput.length < 50) {
              for (const [primaryKey, alternateKeys] of Object.entries(
                similarMatches,
              )) {
                if (
                  quickResponses[primaryKey] &&
                  alternateKeys.some(
                    (alt) =>
                      lowerInput.includes(` ${alt} `) ||
                      lowerInput.startsWith(`${alt} `) ||
                      lowerInput.endsWith(` ${alt}`) ||
                      lowerInput === alt,
                  )
                ) {
                  responseText = quickResponses[primaryKey];
                  break;
                }
              }
            }
          }
        }
      }

      // If no quick response matched, call the API
      if (!responseText) {
        // Call our API endpoint
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();

        if (!data.message) {
          throw new Error("Empty response from API");
        }

        responseText = data.message;
      }

      // Add bot response after a small delay to simulate typing
      setTimeout(() => {
        const botResponse: Message = {
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => {
          const newMessages = [...prev, botResponse];
          chatHistoryRef.current = newMessages;
          return newMessages;
        });

        setIsTyping(false);
        setErrorCount(0); // Reset error count on success
      }, 500);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Increment error count
      setErrorCount((prev) => prev + 1);

      // Different message based on error count
      let errorMessage = "";

      if (errorCount >= 3) {
        // Critical error - suggest direct contact
        errorMessage =
          "I'm sorry, we're experiencing technical difficulties with our chat system. Please call us directly at (213) 349-6790 for immediate assistance, or email support@lbcomputerhelp.com.";
      } else if (errorCount === 2) {
        // Second error - try to answer based on keywords in the user's question
        const lowerInput = userInput.toLowerCase();

        // Try to extract keywords and provide canned responses based on the most likely topic
        if (
          lowerInput.includes("price") ||
          lowerInput.includes("cost") ||
          lowerInput.includes("fee")
        ) {
          errorMessage =
            "While I'm having some technical difficulties, I can tell you that our computer services range from $75-150/hour depending on complexity. Managed IT services start at $299/month. For a detailed quote, please call us at (213) 349-6790.";
        } else if (
          lowerInput.includes("location") ||
          lowerInput.includes("address") ||
          lowerInput.includes("where")
        ) {
          errorMessage =
            "While I'm having some technical difficulties, I can tell you that we're located at 927 Magnolia Ave #2, Long Beach, CA 90813. We also offer on-site services throughout Long Beach and LA County.";
        } else if (
          lowerInput.includes("appointment") ||
          lowerInput.includes("schedule") ||
          lowerInput.includes("book")
        ) {
          errorMessage =
            "I apologize for the technical difficulties. You can book an appointment through our online system at lbcomputerhelp.com/book or by calling (213) 349-6790.";
        } else {
          // Generic second error message
          errorMessage =
            "I'm still having trouble connecting. For immediate assistance, please call us at (213) 349-6790 or email support@lbcomputerhelp.com. Alternatively, you can try asking a simpler question.";
        }
      } else {
        // First error - generic message
        errorMessage =
          "I'm having trouble connecting right now. Let me try to get back on track. Please try your question again, or you can contact our team directly at (213) 349-6790.";
      }

      // Add error message
      const errorResponse: Message = {
        text: errorMessage,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const newMessages = [...prev, errorResponse];
        chatHistoryRef.current = newMessages;
        return newMessages;
      });

      setIsTyping(false);

      // Reset error count after a critical error to give the system another chance
      if (errorCount >= 3) {
        setTimeout(() => setErrorCount(0), 60000); // Reset after 1 minute
      }
    }
  };

  // We've moved the response generation to the API

  // Format timestamp for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] h-[32rem] max-h-[calc(100vh-10rem)] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.342.171a2.25 2.25 0 001.823 0l.342-.171a2.25 2.25 0 001.357-2.059V3.104m-7.5 0a2.25 2.25 0 00-1.875 0m1.875 0a1.875 1.875 0 011.875 0"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold">IT Support Assistant</p>
                <p className="text-xs text-white/80">Powered by Claude AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Bot typing indicator */}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] bg-white border border-gray-200 rounded-lg p-3 text-gray-800">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-4 bg-white"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className={`p-2 rounded-full ${
                  !inputText.trim() || isTyping
                    ? "bg-gray-300 text-gray-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-colors`}
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
