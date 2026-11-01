import React from 'react';

interface AdvanceHackLogoProps {
  size?: number;
  className?: string;
}

export const AdvanceHackLogo: React.FC<AdvanceHackLogoProps> = ({
  size = 58,
  className = '',
}) => {
  return (
    <div
      className={`relative select-none flex-shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Neon Aura / Breathing Glow */}
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#A020F0] via-[#FF32DC] to-[#FFC83D] blur-md opacity-70 animate-neon-breathing pointer-events-none" />

      {/* Main Vector Crown + Wings + Banner Logo */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(255,200,61,0.8)] overflow-visible"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* Purple Wings Gradient */}
          <linearGradient id="logo-wings" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF32DC" />
            <stop offset="50%" stopColor="#A020F0" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

          {/* Banner Dark Gradient */}
          <linearGradient id="logo-banner-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E0E38" />
            <stop offset="100%" stopColor="#080312" />
          </linearGradient>

          <filter id="gold-shine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Purple Cyber Wings flanking behind the crown */}
        <g opacity="0.9">
          {/* Left Wing */}
          <path
            d="M 45,45 C 30,30 15,28 6,36 C 2,44 12,50 24,52 C 10,56 4,64 8,72 C 18,70 32,60 46,54 Z"
            fill="url(#logo-wings)"
            stroke="#FF32DC"
            strokeWidth="0.8"
          />
          {/* Right Wing */}
          <path
            d="M 55,45 C 70,30 85,28 94,36 C 98,44 88,50 76,52 C 90,56 96,64 92,72 C 82,70 68,60 54,54 Z"
            fill="url(#logo-wings)"
            stroke="#FF32DC"
            strokeWidth="0.8"
          />
        </g>

        {/* Back Ambient Glow Circle */}
        <circle cx="50" cy="50" r="38" fill="#0D061A" stroke="url(#logo-gold)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(160,32,240,0.6)" strokeWidth="1" strokeDasharray="4 2" />

        {/* 3D Golden Royal Crown */}
        <g transform="translate(0, -6)" filter="url(#gold-shine)">
          {/* Crown Base */}
          <path
            d="M 28,42 L 24,24 L 37,33 L 50,14 L 63,33 L 76,24 L 72,42 Z"
            fill="url(#logo-gold)"
            stroke="#FEF08A"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Crown base band */}
          <rect x="27" y="40" width="46" height="5" rx="2" fill="#CA8A04" stroke="#FEF08A" strokeWidth="0.8" />

          {/* Crown Jewels (Ruby & Sapphire) */}
          <circle cx="50" cy="14" r="2.8" fill="#FF2B5E" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="24" cy="24" r="2.4" fill="#00B7FF" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="76" cy="24" r="2.4" fill="#00B7FF" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="37" cy="42.5" r="1.5" fill="#FF2B5E" />
          <circle cx="50" cy="42.5" r="1.8" fill="#00FFA3" />
          <circle cx="63" cy="42.5" r="1.5" fill="#00B7FF" />
        </g>

        {/* Curved Embossed Banner for "ADVANCE HACK" */}
        <g transform="translate(0, 4)">
          {/* Banner Outline / Fill */}
          <path
            d="M 12,54 C 30,50 70,50 88,54 C 84,68 76,78 50,78 C 24,78 16,68 12,54 Z"
            fill="url(#logo-banner-bg)"
            stroke="url(#logo-gold)"
            strokeWidth="1.6"
          />

          {/* ADVANCE Text */}
          <text
            x="50"
            y="64"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            letterSpacing="0.8"
            filter="drop-shadow(0 1px 2px #000)"
          >
            ADVANCE
          </text>

          {/* HACK Text */}
          <text
            x="50"
            y="74"
            fill="url(#logo-gold)"
            fontSize="9"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            letterSpacing="1.2"
            filter="drop-shadow(0 0 4px #FFC83D)"
          >
            HACK
          </text>
        </g>

        {/* Star sparkles */}
        <path d="M 50,4 L 51.5,8 L 55,9.5 L 51.5,11 L 50,15 L 48.5,11 L 45,9.5 L 48.5,8 Z" fill="#FFF" opacity="0.9" />
      </svg>
    </div>
  );
};
