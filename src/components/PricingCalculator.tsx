'use client';

import { useState, useRef } from 'react';
import { submitFormWithDebug } from '@/lib/form-debug';

// Pricing data
const pricingData = {
  managedServices: [
    { 
      name: "Basic", 
      priceMonthly: 299, 
      pricePerUser: 49, 
      minUsers: 1, 
      maxUsers: 5, 
      features: [
        "Remote Monitoring",
        "Security Updates",
        "Help Desk Support (M-F 9-5)",
        "Cloud Backup",
        "Email Protection"
      ]
    },
    { 
      name: "Standard", 
      priceMonthly: 499, 
      pricePerUser: 45, 
      minUsers: 6, 
      maxUsers: 15, 
      features: [
        "Everything in Basic",
        "24/7 Support",
        "On-site Support (8 hrs/month)",
        "Network Management",
        "Compliance Reporting"
      ]
    },
    { 
      name: "Premium", 
      priceMonthly: 999, 
      pricePerUser: 40, 
      minUsers: 16, 
      maxUsers: 30, 
      features: [
        "Everything in Standard",
        "Strategic IT Planning",
        "Unlimited On-site Support",
        "Advanced Security Suite",
        "Disaster Recovery"
      ]
    }
  ],
  additionalServices: [
    { 
      name: "Advanced Security Package", 
      priceMonthly: 150, 
      pricePerUser: 10, 
      description: "Enhanced security with threat hunting, dark web monitoring, and security awareness training." 
    },
    { 
      name: "Cloud Services Management", 
      priceMonthly: 200, 
      pricePerUser: 5, 
      description: "Management and optimization of Microsoft 365, Azure, or other cloud platforms." 
    },
    { 
      name: "Mobile Device Management", 
      priceMonthly: 100, 
      pricePerUser: 8, 
      description: "Secure and manage phones, tablets, and laptops with remote wipe capabilities." 
    },
    { 
      name: "VoIP Phone System", 
      priceMonthly: 250, 
      pricePerUser: 15, 
      description: "Cloud-based business phone system with mobile integration and advanced features." 
    }
  ],
  onDemandServices: [
    { 
      name: "Standard Support", 
      price: 125, 
      unit: "per hour", 
      description: "Regular business hours support for hardware, software, and network issues." 
    },
    { 
      name: "Emergency Support", 
      price: 225, 
      unit: "per hour", 
      description: "Expedited response for critical issues affecting business operations." 
    },
    { 
      name: "After-Hours Support", 
      price: 175, 
      unit: "per hour", 
      description: "Support outside regular business hours including evenings and weekends." 
    },
    { 
      name: "Project Services", 
      price: 150, 
      unit: "per hour", 
      description: "Implementation of new technology solutions or infrastructure upgrades." 
    }
  ]
};

export default function PricingCalculator() {
  // Form reference for direct DOM access
  const formRef = useRef<HTMLFormElement>(null);
  
  // Simple state management with no dependencies
  const [calculatorType, setCalculatorType] = useState('managed');
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [userCount, setUserCount] = useState(5);
  const [additionalServices, setAdditionalServices] = useState<number[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  // Handle switching calculator types
  const switchCalculatorType = (type: string) => {
    setCalculatorType(type);
    // Reset other state
    setSelectedPlan(0);
    setUserCount(5);
    setAdditionalServices([]);
    setShowQuoteForm(false);
    setQuoteSubmitted(false);
  };
  
  // Handle changing user count
  const decrementUsers = () => {
    if (userCount > 1) {
      setUserCount(userCount - 1);
    }
  };
  
  const incrementUsers = () => {
    setUserCount(userCount + 1);
  };
  
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setUserCount(value);
    }
  };
  
  // Handle toggling additional services
  const toggleAdditionalService = (index: number) => {
    if (additionalServices.includes(index)) {
      setAdditionalServices(additionalServices.filter(i => i !== index));
    } else {
      setAdditionalServices([...additionalServices, index]);
    }
  };
  
  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);
    
    try {
      // Get base form data
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Convert FormData to a simple object for JSON submission
      const formObject: Record<string, string> = {};
      formData.forEach((value, key) => {
        formObject[key] = value.toString();
      });
      
      // Add calculator details to the form object
      formObject['calculator_type'] = calculatorType;
      formObject['plan'] = calculatorType === 'managed' ? pricingData.managedServices[selectedPlan].name : 'On-Demand';
      
      if (calculatorType === 'managed') {
        formObject['user_count'] = userCount.toString();
        formObject['estimated_price'] = calculatePrice().totalPrice.toFixed(2);
        
        if (additionalServices.length > 0) {
          const servicesNames = additionalServices.map(i => pricingData.additionalServices[i].name);
          formObject['additional_services'] = servicesNames.join(', ');
        }
      }
      
      console.log('Submitting price calculator form through debug service...');
      
      // Use our debugging middleware
      const result = await submitFormWithDebug(formObject, 'PricingCalculator');
      
      if (result.success) {
        // Success
        setQuoteSubmitted(true);
        console.log('Quote request submitted successfully');
      } else {
        // Error
        setFormError(true);
        console.error('Error submitting form:', result.error || result.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate pricing
  const calculatePrice = () => {
    if (calculatorType === 'managed') {
      const plan = pricingData.managedServices[selectedPlan];
      
      // Base price calculation
      const basePrice = plan.priceMonthly + (plan.pricePerUser * Math.max(0, userCount - 1));
      
      // Add-ons calculation
      const addonsPrice = additionalServices.reduce((total, serviceIndex) => {
        const service = pricingData.additionalServices[serviceIndex];
        return total + service.priceMonthly + (service.pricePerUser * userCount);
      }, 0);
      
      const totalPrice = basePrice + addonsPrice;
      const pricePerUser = totalPrice / userCount;
      
      return {
        basePrice,
        addonsPrice,
        totalPrice,
        pricePerUser
      };
    }
    
    return {
      basePrice: 0,
      addonsPrice: 0,
      totalPrice: 0,
      pricePerUser: 0
    };
  };
  
  // Main calculator view
  if (showQuoteForm) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        {quoteSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your quote request has been received. One of our IT specialists will contact you within 1 business day.
            </p>
            <button
              onClick={() => {
                setShowQuoteForm(false);
                setQuoteSubmitted(false);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Calculator
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Request Your Custom Quote</h2>
              <button 
                onClick={() => setShowQuoteForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {calculatorType === 'managed' && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Your Selected Plan</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                    {pricingData.managedServices[selectedPlan].name} Plan
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                    {userCount} Users
                  </span>
                  {additionalServices.map((index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                      + {pricingData.additionalServices[index].name}
                    </span>
                  ))}
                </div>
                <div className="mt-2 font-medium text-blue-800">
                  Estimated Total: ${calculatePrice().totalPrice.toFixed(2)}/month
                </div>
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleFormSubmit}>
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                  <p className="font-medium">There was a problem submitting your form. Please try again.</p>
                </div>
              )}
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your specific IT needs or requirements..."
                ></textarea>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Calculator tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 font-medium text-center ${
            calculatorType === 'managed' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => switchCalculatorType('managed')}
        >
          Managed IT Services
        </button>
        <button
          className={`flex-1 py-3 font-medium text-center ${
            calculatorType === 'onDemand' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => switchCalculatorType('onDemand')}
        >
          On-Demand Support
        </button>
      </div>
      
      <div className="p-6">
        {calculatorType === 'managed' ? (
          <div>
            {/* Managed Services Calculator */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">1. Select your plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingData.managedServices.map((plan, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlan === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => setSelectedPlan(index)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900">{plan.name}</h4>
                      {selectedPlan === index && (
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      ${plan.priceMonthly}
                      <span className="text-sm font-normal text-gray-500">/mo + per user</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Ideal for {plan.minUsers}-{plan.maxUsers} users
                    </p>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">2. Configure user count</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Users
                  </label>
                  <div className="flex max-w-xs">
                    <button
                      type="button"
                      onClick={decrementUsers}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-l-md border border-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={userCount}
                      onChange={handleUserInputChange}
                      className="p-2 text-center w-16 border-t border-b border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={incrementUsers}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-r-md border border-gray-300"
                    >
                      +
                    </button>
                    <span className="ml-3 text-sm text-gray-500 self-center">
                      ${pricingData.managedServices[selectedPlan].pricePerUser}/user after first user
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">3. Add services (optional)</h3>
              <div className="space-y-3">
                {pricingData.additionalServices.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-start border border-gray-200 rounded-lg p-4"
                  >
                    <input
                      type="checkbox"
                      id={`addon-${index}`}
                      checked={additionalServices.includes(index)}
                      onChange={() => toggleAdditionalService(index)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <label htmlFor={`addon-${index}`} className="ml-3 flex-grow cursor-pointer">
                      <div className="flex justify-between flex-wrap">
                        <span className="font-medium text-gray-900">{service.name}</span>
                        <span className="text-blue-600 font-medium">
                          +${service.priceMonthly}/mo + ${service.pricePerUser}/user
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Your Estimated Cost</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span>Base Price:</span>
                    <span className="font-bold">${calculatePrice().basePrice.toFixed(2)}</span>
                  </div>
                  {additionalServices.length > 0 && (
                    <div className="flex justify-between py-2 border-b border-white/20">
                      <span>Add-on Services:</span>
                      <span className="font-bold">${calculatePrice().addonsPrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total Monthly:</span>
                    <span>${calculatePrice().totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/80 pt-1">
                    <span>Cost Per User:</span>
                    <span>${calculatePrice().pricePerUser.toFixed(2)}/user/month</span>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Request Detailed Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* On-Demand Services */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">On-Demand IT Support Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pricingData.onDemandServices.map((service, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-900">{service.name}</h4>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium">
                        ${service.price} {service.unit}
                      </span>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need a Customized Solution?</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Our on-demand services can be tailored to your specific needs. Contact us for a personalized quote.
              </p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}