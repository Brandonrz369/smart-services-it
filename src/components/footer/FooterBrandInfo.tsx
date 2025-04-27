import React from 'react';

export default function FooterBrandInfo() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Smart Services IT</h3>
      <p className="text-gray-300 mb-4">
        Professional IT support and computer services in Hicksville, 
        New York and throughout the surrounding areas.
      </p>
      <p className="text-gray-300">
        © {new Date().getFullYear()} Smart Services IT. All rights
        reserved.
      </p>
    </div>
  );
}
