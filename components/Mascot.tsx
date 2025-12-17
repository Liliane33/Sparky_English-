
import React from 'react';

interface MascotProps {
  mood?: 'happy' | 'talking' | 'thinking' | 'idle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Mascot: React.FC<MascotProps> = ({ mood = 'idle', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Bumble is a cute yellow creature with friendly features */}
      <svg viewBox="0 0 200 200" className="w-full h-full bounce">
        <defs>
          <radialGradient id="bumbleGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#FDE047', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#EAB308', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        
        {/* Body */}
        <circle cx="100" cy="100" r="85" fill="url(#bumbleGrad)" stroke="#A16207" strokeWidth="2" />
        
        {/* Antennas */}
        <line x1="70" y1="30" x2="85" y2="60" stroke="#422006" strokeWidth="6" strokeLinecap="round" />
        <line x1="130" y1="30" x2="115" y2="60" stroke="#422006" strokeWidth="6" strokeLinecap="round" />
        <circle cx="70" cy="25" r="8" fill="#422006" />
        <circle cx="130" cy="25" r="8" fill="#422006" />

        {/* Eyes - Large and friendly */}
        <circle cx="70" cy="85" r="18" fill="white" />
        <circle cx="130" cy="85" r="18" fill="white" />
        <circle cx="70" cy="85" r="10" fill="#422006" />
        <circle cx="130" cy="85" r="10" fill="#422006" />
        {/* Eye Shine */}
        <circle cx="66" cy="81" r="4" fill="white" />
        <circle cx="126" cy="81" r="4" fill="white" />

        {/* Mouth */}
        {mood === 'talking' ? (
          <ellipse cx="100" cy="130" rx="25" ry="12" fill="#991B1B" />
        ) : mood === 'happy' ? (
          <path d="M65 125 Q100 165 135 125" stroke="#422006" strokeWidth="10" fill="transparent" strokeLinecap="round" />
        ) : (
          <path d="M80 135 Q100 145 120 135" stroke="#422006" strokeWidth="8" fill="transparent" strokeLinecap="round" />
        )}

        {/* Cheeks */}
        <circle cx="45" cy="115" r="12" fill="#F87171" fillOpacity="0.3" />
        <circle cx="155" cy="115" r="12" fill="#F87171" fillOpacity="0.3" />
      </svg>
    </div>
  );
};

export default Mascot;
