// Placeholder for FooterMain component
import React from 'react';
import FooterBrandInfo from './FooterBrandInfo';
import FooterServiceLinks from './FooterServiceLinks';
import FooterContactInfo from './FooterContactInfo';
import FooterHours from './FooterHours';
import FooterTrustBadges from './FooterTrustBadges';

export default function FooterMain() {
  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterBrandInfo />
          <FooterServiceLinks />
          <FooterContactInfo />
          <FooterHours />
        </div>
        <FooterTrustBadges />
      </div>
    </footer>
  );
}
