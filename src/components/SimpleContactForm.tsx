'use client';

export default function SimpleContactForm() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h2>
      
      <form
        action="https://formspree.io/f/xzzeddgr"
        method="POST"
        target="_blank"
      >
        {/* Redirect back to our site after submission */}
        <input type="hidden" name="_next" value="https://lbcomputerhelp.com/thanks" />
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        {/* Include a honeypot field to prevent spam */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}