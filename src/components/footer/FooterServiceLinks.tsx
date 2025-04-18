import React from 'react';
import Link from 'next/link';

export default function FooterServiceLinks() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Services</h3>
      <ul className="space-y-2">
        <li>
          <Link
            href="/services"
            className="text-gray-300 hover:text-white transition"
          >
            Computer Services
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className="text-gray-300 hover:text-white transition"
          >
            IT Support
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className="text-gray-300 hover:text-white transition"
          >
            Managed Services
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className="text-gray-300 hover:text-white transition"
          >
            Data Solutions
          </Link>
        </li>
        <li>
          <Link
            href="/emergency"
            className="text-red-400 hover:text-red-300 transition"
          >
            Emergency Support
          </Link>
        </li>
      </ul>
    </div>
  );
}
