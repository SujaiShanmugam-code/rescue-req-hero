
import React from 'react';

interface HostageIconProps {
  size?: 'sm' | 'md' | 'lg';
  status?: 'trapped' | 'freed';
}

const HostageIcon: React.FC<HostageIconProps> = ({ size = 'md', status = 'trapped' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Box representing tunnel */}
        <div className="absolute inset-0 border-2 border-gray-400 bg-gray-100 flex items-center justify-center">
          {/* People icons */}
          {status === 'trapped' ? (
            <div className="grid grid-cols-2 gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <div className="w-3 h-3 rounded-full bg-gray-400" />
            </div>
          ) : (
            <svg viewBox="0 0 24 24" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12.75C8.83 12.75 6.25 15.33 6.25 18.5V19.88H17.75V18.5C17.75 15.33 15.17 12.75 12 12.75Z" stroke="#4CAF50" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 10C13.66 10 15 8.66 15 7C15 5.34 13.66 4 12 4C10.34 4 9 5.34 9 7C9 8.66 10.34 10 12 10Z" stroke="#4CAF50" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 19.88H17.75" stroke="#4CAF50" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.25 19.88H3" stroke="#4CAF50" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        
        {/* X Mark if trapped */}
        {status === 'trapped' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 border border-gray-300" />
              <div className="absolute left-0 top-0 w-full h-0.5 bg-gray-300 origin-left transform rotate-45 translate-y-1/2" style={{ width: '141%' }} />
              <div className="absolute right-0 top-0 w-full h-0.5 bg-gray-300 origin-right transform -rotate-45 translate-y-1/2" style={{ width: '141%' }} />
            </div>
          </div>
        )}
      </div>
      <span className="text-gray-700 text-sm mt-1">
        {status === 'trapped' ? 'Hostages in tears' : 'Hostages Freed'}
      </span>
    </div>
  );
};

export default HostageIcon;
