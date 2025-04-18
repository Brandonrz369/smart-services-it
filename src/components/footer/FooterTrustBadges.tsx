import React from 'react';

export default function FooterTrustBadges() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      {/* Pricing */}
      <div>
        <h4 className="font-semibold text-gray-100 mb-2">Transparent Pricing</h4>
        <ul className="text-gray-400 space-y-1">
          <li>Diagnostic Assessment: $99</li>
          <li>Hourly Assistance: $125/hr</li>
          <li>IT Consultation: $150/hr</li>
          {/* Add more key prices if desired */}
        </ul>
      </div>
      {/* Certified */}
      <div>
        <h4 className="font-semibold text-gray-100 mb-2">Local & Certified</h4>
        <p className="text-gray-400">LB Computer Help</p>
        <p className="text-gray-400">927 Magnolia Ave #2, Long Beach, CA 90813</p>
        <p className="text-gray-400">Serving Long Beach Since 2018</p>
        <p className="text-gray-400 mt-1 font-medium">Fully Insured</p>
        {/* Add Certifications */}
      </div>
      {/* Disclaimer */}
      <div>
        <h4 className="font-semibold text-gray-100 mb-2">Independent Service Provider</h4>
        <p className="text-gray-400">
          LB Computer Help is an independent company providing expert tech assistance. We are not affiliated with Microsoft, Apple, Dell, HP, or others. Recommendations are based on best practices and your needs.
        </p>
      </div>
    </div>
  );
}
