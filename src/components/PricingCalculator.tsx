'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pricing data
const pricingData = {
  managedServices: [
    { name: "Basic", priceMonthly: 299, pricePerUser: 49, minUsers: 1, maxUsers: 5, features: [
      "Remote Monitoring",
      "Security Updates",
      "Help Desk Support (M-F 9-5)",
      "Cloud Backup",
      "Email Protection"
    ]},
    { name: "Standard", priceMonthly: 499, pricePerUser: 45, minUsers: 6, maxUsers: 15, features: [
      "Everything in Basic",
      "24/7 Support",
      "On-site Support (8 hrs/month)",
      "Network Management",
      "Compliance Reporting"
    ]},
    { name: "Premium", priceMonthly: 999, pricePerUser: 40, minUsers: 16, maxUsers: 30, features: [
      "Everything in Standard",
      "Strategic IT Planning",
      "Unlimited On-site Support",
      "Advanced Security Suite",
      "Disaster Recovery"
    ]}
  ],
  additionalServices: [
    { name: "Advanced Security Package", priceMonthly: 150, pricePerUser: 10, description: "Enhanced security with threat hunting, dark web monitoring, and security awareness training." },
    { name: "Cloud Services Management", priceMonthly: 200, pricePerUser: 5, description: "Management and optimization of Microsoft 365, Azure, or other cloud platforms." },
    { name: "Mobile Device Management", priceMonthly: 100, pricePerUser: 8, description: "Secure and manage phones, tablets, and laptops with remote wipe capabilities." },
    { name: "VoIP Phone System", priceMonthly: 250, pricePerUser: 15, description: "Cloud-based business phone system with mobile integration and advanced features." }
  ],
  onDemandServices: [
    { name: "Standard Support", price: 125, unit: "per hour", description: "Regular business hours support for hardware, software, and network issues." },
    { name: "Emergency Support", price: 225, unit: "per hour", description: "Expedited response for critical issues affecting business operations." },
    { name: "After-Hours Support", price: 175, unit: "per hour", description: "Support outside regular business hours including evenings and weekends." },
    { name: "Project Services", price: 150, unit: "per hour", description: "Implementation of new technology solutions or infrastructure upgrades." }
  ]
};

export default function PricingCalculator() {
  const [calculatorType, setCalculatorType] = useState<'managed' | 'onDemand'>('managed');
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [userCount, setUserCount] = useState(5);
  const [additionalServices, setAdditionalServices] = useState<number[]>([]);
  const [showCustomQuote, setShowCustomQuote] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Reset state when calculator type changes
  useEffect(() => {
    setSelectedPlan(0);
    setUserCount(5);
    setAdditionalServices([]);
  }, [calculatorType]);
  
  // Calculate total based on selections
  const calculateTotal = () => {
    if (calculatorType === 'managed') {
      const plan = pricingData.managedServices[selectedPlan];
      const baseTotal = plan.priceMonthly + (plan.pricePerUser * Math.max(userCount - 1, 0));
      
      // Add additional services
      const addonsTotal = additionalServices.reduce((total, serviceIndex) => {
        const service = pricingData.additionalServices[serviceIndex];
        return total + service.priceMonthly + (service.pricePerUser * userCount);
      }, 0);
      
      return {
        basePrice: baseTotal,
        addonsPrice: addonsTotal,
        total: baseTotal + addonsTotal,
        perUser: (baseTotal + addonsTotal) / userCount
      };
    }
    
    return { basePrice: 0, addonsPrice: 0, total: 0, perUser: 0 };
  };
  
  const handleUserCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1) {
      setUserCount(value);
    }
  };
  
  const toggleAdditionalService = (index: number) => {
    setAdditionalServices(current => 
      current.includes(index) 
        ? current.filter(i => i !== index) 
        : [...current, index]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, you would send this data to your backend or email service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const renderManagedServicesCalculator = () => {
    const plan = pricingData.managedServices[selectedPlan];
    const totals = calculateTotal();
    
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Your Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingData.managedServices.map((plan, index) => (
              <div 
                key={index}
                onClick={() => setSelectedPlan(index)}
                className={`border rounded-lg p-5 cursor-pointer transition-all ${
                  selectedPlan === index 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-900">{plan.name}</h4>
                  {selectedPlan === index && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Selected</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  ${plan.priceMonthly}
                  <span className="text-sm text-gray-500 font-normal">/mo + per user</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">Ideal for {plan.minUsers} to {plan.maxUsers} users</p>
                <ul className="text-sm space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Configure Your Plan</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Users</label>
            <div className="flex items-center">
              <button 
                onClick={() => setUserCount(Math.max(1, userCount - 1))}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-l-md border border-gray-300"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input 
                type="number" 
                value={userCount}
                onChange={handleUserCountChange}
                min="1"
                className="w-16 text-center border-t border-b border-gray-300 h-10"
              />
              <button 
                onClick={() => setUserCount(userCount + 1)}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-md border border-gray-300"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <span className="ml-3 text-sm text-gray-600">(${plan.pricePerUser}/user after first user)</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Add-on Services (Optional)</h4>
            <div className="space-y-3">
              {pricingData.additionalServices.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-start border border-gray-200 rounded-md p-3"
                >
                  <div className="flex-shrink-0">
                    <input 
                      type="checkbox" 
                      id={`service-${index}`} 
                      checked={additionalServices.includes(index)}
                      onChange={() => toggleAdditionalService(index)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                    />
                  </div>
                  <label htmlFor={`service-${index}`} className="ml-3 cursor-pointer flex-grow">
                    <div className="flex justify-between">
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
        </div>
        
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V4z" clipRule="evenodd" />
            </svg>
            Your Estimated Monthly Cost
          </h3>
          <div className="space-y-3 mb-6 bg-blue-700 p-4 rounded-lg">
            <div className="flex justify-between pb-2 border-b border-blue-500">
              <span className="font-medium">{plan.name} Plan Base Price:</span>
              <span className="font-bold">${totals.basePrice.toFixed(2)}</span>
            </div>
            {additionalServices.length > 0 && (
              <div className="flex justify-between pb-2 border-b border-blue-500">
                <span className="font-medium">Additional Services:</span>
                <span className="font-bold">${totals.addonsPrice.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>Total Monthly:</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-blue-100">
              <span>Cost Per User:</span>
              <span className="font-medium">${totals.perUser.toFixed(2)}/user/month</span>
            </div>
          </div>
          <div className="text-center">
            <button 
              onClick={() => setShowCustomQuote(true)}
              className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-6 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Request Your Custom Quote
            </button>
            <p className="text-xs text-blue-200 mt-2">Detailed pricing breakdown • Fast response</p>
          </div>
        </div>
      </div>
    );
  };
  
  const renderOnDemandServicesCalculator = () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">On-Demand Support Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingData.onDemandServices.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900">{service.name}</h4>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-medium">
                    ${service.price} {service.unit}
                  </span>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-3">Need Additional Information?</h3>
          <p className="text-gray-600 mb-4">
            Our on-demand services are designed for flexibility. Contact us for a personalized quote based on your specific needs.
          </p>
          <button 
            onClick={() => setShowCustomQuote(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Get Custom Quote
          </button>
        </div>
      </div>
    );
  };
  
  const renderCustomQuoteForm = () => {
    if (showConfirmation) {
      return (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Received!</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Thank you for your interest. One of our IT specialists will contact you within 1 business day with your detailed quote.
          </p>
          <button
            onClick={() => {
              setShowConfirmation(false);
              setShowCustomQuote(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Return to Calculator
          </button>
        </div>
      );
    }
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Request Your Custom Quote</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
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
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={contactInfo.company}
              onChange={handleContactInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="ABC Company"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
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
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactInfoChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="(213) 555-1234"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={contactInfo.notes}
            onChange={handleContactInfoChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please share any specific requirements or questions..."
          ></textarea>
        </div>
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowCustomQuote(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Request Quote'}
          </button>
        </div>
      </form>
    );
  };
  
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 relative">
      {/* Subtle highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-blue-50 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-700"></div>
      
      {/* Calculator Type Tabs */}
      <div className="flex border-b border-gray-200 relative z-10">
        <button
          onClick={() => setCalculatorType('managed')}
          className={`flex-1 py-4 px-4 text-center font-bold ${
            calculatorType === 'managed'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-50 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Managed IT Services
        </button>
        <button
          onClick={() => setCalculatorType('onDemand')}
          className={`flex-1 py-4 px-4 text-center font-bold ${
            calculatorType === 'onDemand'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-50 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          On-Demand Support
        </button>
      </div>
      
      {/* Calculator Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={showCustomQuote ? 'quote-form' : calculatorType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {showCustomQuote ? (
              renderCustomQuoteForm()
            ) : (
              calculatorType === 'managed' ? renderManagedServicesCalculator() : renderOnDemandServicesCalculator()
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}