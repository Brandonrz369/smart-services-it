'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: Option[];
  nextQuestion?: string | { [key: string]: string };
  condition?: {
    questionId: string;
    answers: string[];
  };
}

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface Assessment {
  title: string;
  description: string;
  questions: Question[];
  startQuestionId: string;
}

interface AssessmentState {
  currentQuestionId: string;
  answers: Record<string, string | string[]>;
  completed: boolean;
  progress: number;
}

// Service Assessment Component
export default function ServiceAssessment() {
  // Define the assessment
  const assessment: Assessment = {
    title: "IT Needs Assessment",
    description: "Answer a few questions to get personalized IT recommendations for your business or home",
    startQuestionId: "business_type",
    questions: [
      {
        id: "business_type",
        text: "Are you looking for service for:",
        type: "single",
        options: [
          { value: "business", label: "Business", description: "Services for companies, organizations, or self-employed" },
          { value: "home", label: "Personal/Home", description: "Services for personal devices or home networks" }
        ],
        nextQuestion: {
          "business": "business_size",
          "home": "device_type"
        }
      },
      {
        id: "business_size",
        text: "How many employees are in your organization?",
        type: "single",
        options: [
          { value: "solo", label: "Just me (sole proprietor/freelancer)" },
          { value: "micro", label: "2-5 employees" },
          { value: "small", label: "6-25 employees" },
          { value: "medium", label: "26-100 employees" },
          { value: "large", label: "100+ employees" }
        ],
        nextQuestion: "current_it"
      },
      {
        id: "current_it",
        text: "Do you currently have IT support?",
        type: "single",
        options: [
          { value: "none", label: "No, we don't have IT support" },
          { value: "internal", label: "Yes, we have internal IT staff" },
          { value: "msp", label: "Yes, we use another managed service provider" },
          { value: "occasional", label: "We use occasional/break-fix IT help" }
        ],
        nextQuestion: "top_concerns"
      },
      {
        id: "top_concerns",
        text: "What are your top IT concerns? (Select all that apply)",
        type: "multiple",
        options: [
          { value: "security", label: "Cybersecurity & Data Protection" },
          { value: "reliability", label: "System Reliability & Uptime" },
          { value: "cost", label: "Reducing IT Costs" },
          { value: "support", label: "Faster Support Response Times" },
          { value: "cloud", label: "Cloud Services & Migration" },
          { value: "compliance", label: "Regulatory Compliance" },
          { value: "remote", label: "Remote Work Infrastructure" }
        ],
        nextQuestion: "urgency"
      },
      {
        id: "device_type",
        text: "What type of device(s) do you need help with?",
        type: "multiple",
        condition: {
          questionId: "business_type",
          answers: ["home"]
        },
        options: [
          { value: "laptop", label: "Laptop/Desktop Computer" },
          { value: "mobile", label: "Smartphone/Tablet" },
          { value: "network", label: "Home Network/WiFi" },
          { value: "smart_home", label: "Smart Home Devices" },
          { value: "other", label: "Other" }
        ],
        nextQuestion: "home_issue"
      },
      {
        id: "home_issue",
        text: "What issues are you experiencing?",
        type: "multiple",
        condition: {
          questionId: "business_type",
          answers: ["home"]
        },
        options: [
          { value: "slow", label: "Slow performance" },
          { value: "virus", label: "Virus/Malware concerns" },
          { value: "wifi", label: "WiFi/Network problems" },
          { value: "data", label: "Data recovery needs" },
          { value: "upgrade", label: "Need upgrades or new equipment" },
          { value: "error", label: "Error messages/Blue screen" },
          { value: "setup", label: "Need help with setup or configuration" }
        ],
        nextQuestion: "urgency"
      },
      {
        id: "urgency",
        text: "How urgent is your need?",
        type: "single",
        options: [
          { value: "emergency", label: "Emergency - Need help immediately" },
          { value: "urgent", label: "Urgent - Need help within 24-48 hours" },
          { value: "soon", label: "Soon - Need help within the week" },
          { value: "planning", label: "Planning - Researching options for the future" }
        ],
        nextQuestion: "contact_info"
      },
      {
        id: "contact_info",
        text: "How would you like to receive your personalized recommendations?",
        type: "text",
        nextQuestion: "completed"
      }
    ]
  };

  // State
  const [state, setState] = useState<AssessmentState>({
    currentQuestionId: assessment.startQuestionId,
    answers: {},
    completed: false,
    progress: 0
  });

  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find current question
  const currentQuestion = assessment.questions.find(q => q.id === state.currentQuestionId);
  
  // Calculate progress
  const calculateProgress = () => {
    if (state.completed) return 100;
    const totalQuestions = getRelevantQuestions().length;
    const answeredQuestions = Object.keys(state.answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // Get only questions relevant to this path
  const getRelevantQuestions = () => {
    return assessment.questions.filter(q => {
      // If no condition, question is always relevant
      if (!q.condition) return true;
      
      // Destructure safely with a type assertion
      const { questionId, answers } = q.condition as { questionId: string; answers: string[] };
      const answer = state.answers[questionId];
      
      if (!answer) return false;
      
      // For single answers
      if (typeof answer === 'string') {
        return answers.includes(answer);
      }
      
      // For multiple answers (arrays)
      if (Array.isArray(answer)) {
        return answer.some(ans => answers.includes(ans));
      }
      
      return false;
    });
  };

  // Handle answer selection
  const handleAnswer = (answer: string | string[]) => {
    // Update the answers
    const updatedAnswers = {
      ...state.answers,
      [currentQuestion!.id]: answer
    };
    
    // Determine next question
    let nextQuestionId = '';
    
    if (typeof currentQuestion!.nextQuestion === 'string') {
      nextQuestionId = currentQuestion!.nextQuestion;
    } else if (typeof currentQuestion!.nextQuestion === 'object' && typeof answer === 'string') {
      nextQuestionId = currentQuestion!.nextQuestion[answer] || 'completed';
    } else {
      // Default to completed if no next question defined
      nextQuestionId = 'completed';
    }
    
    // Check if we've reached the end
    const completed = nextQuestionId === 'completed';
    
    // Update state
    setState({
      currentQuestionId: nextQuestionId,
      answers: updatedAnswers,
      completed,
      progress: calculateProgress()
    });
    
    if (completed) {
      setShowResults(true);
    }
  };

  // Handle contact info change
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle contact form submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Add assessment answers to form data
      formData.append('assessment_answers', JSON.stringify(state.answers));
      
      // Update state to completed immediately to show results
      setState({
        ...state,
        completed: true,
        progress: 100
      });
      
      // Show results immediately
      setShowResults(true);
      
      // Create a simple object with all form data
      console.log('Preparing IT assessment data...');
      const formObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Add assessment answers as a field
      formObject['assessment_data'] = JSON.stringify(state.answers);
      
      // Send as JSON instead of FormData
      console.log('Submitting IT assessment to Formspree as JSON...');
      const response = await fetch('https://formspree.io/f/xzzeddgr', {
        method: 'POST',
        body: JSON.stringify(formObject),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Formspree response status:', response.status);
      
      // Additional debugging - log the response JSON if possible
      try {
        const responseData = await response.clone().json();
        console.log('Formspree response data:', responseData);
      } catch (e) {
        console.log('Could not parse response JSON:', e);
      }
      
      if (response.ok) {
        console.log('Assessment data sent successfully!');
        // Don't show alert - too disruptive on mobile
      } else {
        console.error('Error submitting assessment');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate recommendations based on answers
  const generateRecommendations = () => {
    const answers = state.answers;
    const recommendations = [];
    
    // Type guard functions
    const isString = (value: unknown): value is string => typeof value === 'string';
    const isStringArray = (value: unknown): value is string[] => Array.isArray(value);
    
    // Business recommendations
    if (isString(answers.business_type) && answers.business_type === 'business') {
      // Size-based recommendations
      if (isString(answers.business_size)) {
        if (['micro', 'solo'].includes(answers.business_size)) {
          recommendations.push({
            title: "Small Business IT Support Package",
            description: "Affordable monthly support designed specifically for small businesses and freelancers.",
            icon: "💼"
          });
        } else if (['small', 'medium'].includes(answers.business_size)) {
          recommendations.push({
            title: "Comprehensive Managed IT Services",
            description: "Complete IT management with 24/7 monitoring, support, and strategic planning.",
            icon: "🏢"
          });
        }
      }
      
      // Based on IT concerns
      if (isStringArray(answers.top_concerns)) {
        if (answers.top_concerns.includes('security')) {
          recommendations.push({
            title: "Cybersecurity Protection Plan",
            description: "Multi-layered security with advanced threat protection, employee training, and regular security assessments.",
            icon: "🔒"
          });
        }
        
        if (answers.top_concerns.includes('cloud')) {
          recommendations.push({
            title: "Cloud Migration & Management",
            description: "Seamless transition to cloud services with ongoing management and optimization.",
            icon: "☁️"
          });
        }
        
        if (answers.top_concerns.includes('remote')) {
          recommendations.push({
            title: "Remote Work Infrastructure Setup",
            description: "Secure, reliable remote access solutions with VPN, collaboration tools, and cloud-based services.",
            icon: "🏠"
          });
        }
      }
    } 
    // Home/Personal recommendations
    else {
      if (isStringArray(answers.device_type)) {
        if (answers.device_type.includes('laptop')) {
          recommendations.push({
            title: "Computer Tune-Up & Optimization",
            description: "Comprehensive system cleaning, updates, and performance optimization.",
            icon: "💻"
          });
        }
        
        if (answers.device_type.includes('network')) {
          recommendations.push({
            title: "Home Network Enhancement",
            description: "WiFi optimization, security hardening, and proper network configuration.",
            icon: "🔌"
          });
        }
        
        if (answers.device_type.includes('smart_home')) {
          recommendations.push({
            title: "Smart Home Integration",
            description: "Setup, troubleshooting, and security for your connected home devices.",
            icon: "🏠"
          });
        }
      }
      
      if (isStringArray(answers.home_issue)) {
        if (answers.home_issue.includes('virus')) {
          recommendations.push({
            title: "Virus Removal & Security Setup",
            description: "Complete malware removal, system cleaning, and ongoing protection setup.",
            icon: "🦠"
          });
        }
        
        if (answers.home_issue.includes('data')) {
          recommendations.push({
            title: "Data Recovery Service",
            description: "Professional recovery of lost or damaged files with secure backup solutions.",
            icon: "💾"
          });
        }
      }
    }
    
    // Urgency-based recommendations
    if (isString(answers.urgency) && ['emergency', 'urgent'].includes(answers.urgency)) {
      recommendations.push({
        title: "Priority Response Service",
        description: "Same-day service with dedicated support technician.",
        icon: "🚨"
      });
    }
    
    // If no specific recommendations match (fallback)
    if (recommendations.length === 0) {
      recommendations.push({
        title: "Personalized IT Consultation",
        description: "Schedule a call with our experts to discuss your specific needs and create a custom solution.",
        icon: "👨‍💻"
      });
    }
    
    return recommendations;
  };

  // Render question
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'single':
        return (
          <div className="space-y-4">
            <p className="text-xl font-medium text-gray-800">{currentQuestion.text}</p>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="flex flex-col p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {option.description && (
                    <span className="text-sm text-gray-500 mt-1">{option.description}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'multiple':
        return (
          <MultipleChoiceQuestion 
            question={currentQuestion} 
            onAnswer={handleAnswer}
          />
        );
        
      case 'text':
        return (
          <div className="space-y-6">
            <p className="text-xl font-medium text-gray-800">{currentQuestion.text}</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(213) 555-1234"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                } active:bg-blue-800 active:scale-95`}
              >
                {isSubmitting ? 'Submitting...' : 'Get My Recommendations'}
              </button>
              {isSubmitting && (
                <p className="text-sm text-center mt-2 text-gray-600">Processing your assessment...</p>
              )}
            </form>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Multiple choice question component
  function MultipleChoiceQuestion({ 
    question, 
    onAnswer 
  }: { 
    question: Question, 
    onAnswer: (answer: string[]) => void 
  }) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    
    const toggleOption = (value: string) => {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(selectedOptions.filter(option => option !== value));
      } else {
        setSelectedOptions([...selectedOptions, value]);
      }
    };
    
    const handleSubmit = () => {
      if (selectedOptions.length > 0) {
        onAnswer(selectedOptions);
      }
    };
    
    return (
      <div className="space-y-6">
        <p className="text-xl font-medium text-gray-800">{question.text}</p>
        
        <div className="space-y-3">
          {question.options?.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedOptions.includes(option.value)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <div
                  className={`w-5 h-5 border rounded-md flex items-center justify-center ${
                    selectedOptions.includes(option.value)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-400'
                  }`}
                >
                  {selectedOptions.includes(option.value) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <span className="font-medium text-gray-900">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            selectedOptions.length === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800 active:scale-95'
          }`}
        >
          Continue
        </button>
      </div>
    );
  }

  // Results component
  const Results = () => {
    const recommendations = generateRecommendations();
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized IT Recommendations</h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Based on your needs, we&apos;ve prepared these custom recommendations. A member of our team will contact you shortly to discuss these options in detail.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="text-3xl mb-4">{rec.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{rec.title}</h4>
                <p className="text-gray-600">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h4>
          <ol className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-medium mr-3">1</span>
              <span>One of our IT specialists will review your assessment</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-medium mr-3">2</span>
              <span>We&apos;ll contact you within 1 business day (or immediately for urgent needs)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-medium mr-3">3</span>
              <span>You&apos;ll receive a detailed proposal with pricing and options</span>
            </li>
          </ol>
        </div>
        
        <div className="flex justify-center">
          <a
            href="tel:2133496790"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Need Immediate Help? Call (213) 349-6790
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${state.progress}%` }}
        />
      </div>
      
      <div className="p-6 md:p-8">
        {!state.completed ? (
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentQuestionId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderQuestion()}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          // Use showResults to conditionally render with additional styling if needed
          <div className={showResults ? "fade-in" : ""}>
            <Results />
          </div>
        )}
      </div>
    </div>
  );
}