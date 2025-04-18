import React from 'react';
import Link from 'next/link';

export default function FooterHours() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Hours</h3>
      <ul className="space-y-2">
        <li className="text-gray-300">Monday-Friday: 6AM - 6PM</li>
        <li className="text-gray-300">Saturday: 6AM - 6PM</li>
        <li className="text-gray-300">Sunday: Closed</li>
      </ul>
      <div className="mt-6">
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
