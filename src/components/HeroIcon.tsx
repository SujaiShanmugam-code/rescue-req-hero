
import React from 'react';

interface HeroIconProps {
  size?: 'sm' | 'md' | 'lg';
  status?: 'neutral' | 'happy' | 'sad';
}

const HeroIcon: React.FC<HeroIconProps> = ({ size = 'md', status = 'neutral' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} text-gray-500`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Helmet */}
          <path d="M50,20 C40,20 30,25 30,40 L70,40 C70,25 60,20 50,20 Z" fill="#607D8B" />
          
          {/* Head */}
          <circle cx="50" cy="45" r="10" fill="#90A4AE" />
          
          {/* Body */}
          <path d="M30,50 L30,80 L70,80 L70,50 Z" fill="#607D8B" />
          
          {/* Expression */}
          {status === 'happy' && (
            <path d="M43,43 Q50,48 57,43" stroke="#4CAF50" strokeWidth="2" fill="none" />
          )}
          {status === 'sad' && (
            <path d="M43,47 Q50,42 57,47" stroke="#D32F2F" strokeWidth="2" fill="none" />
          )}
          {status === 'neutral' && (
            <path d="M43,45 L57,45" stroke="#455A64" strokeWidth="2" fill="none" />
          )}
          
          {/* Tool/Staff */}
          <rect x="72" y="30" width="5" height="50" fill="#455A64" />
        </svg>
      </div>
      {status === 'happy' && <span className="text-green-500 text-sm mt-1">Yes Hero</span>}
      {status === 'sad' && <span className="text-red-500 text-sm mt-1">Not a Hero hahah</span>}
    </div>
  );
};

export default HeroIcon;
