import React from 'react';

export default function FooterBrandInfo() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">LB Computer Help</h3>
      <p className="text-gray-300 mb-4">
        Professional IT support and computer services in Long
        Beach and throughout Los Angeles County.
      </p>
      <p className="text-gray-300">
        © {new Date().getFullYear()} LB Computer Help. All rights
        reserved.
      </p>
    </div>
  );
}
