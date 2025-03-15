'use client';

import { useState } from 'react';

export default function VideoApproval() {
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ${
      isApproved ? 'translate-x-[200%]' : ''
    }`}>
      <div className="flex flex-col space-y-3">
        <div className="text-sm font-medium text-gray-900">
          Video oynatılsın mı?
        </div>
        <video
          className="w-48 h-auto rounded-md"
          src="/machine1.mp4"
          muted
          playsInline
          loop
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setIsApproved(true)}
            className="flex-1 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            Onayla
          </button>
          <button
            onClick={() => setIsApproved(true)}
            className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors duration-300"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
} 