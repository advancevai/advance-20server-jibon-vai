import React from 'react';

/**
 * Supercar Artwork for Wingo Card (Electric Blue Sports Car with Speed Streaks)
 */
export const WingoSupercarArtwork: React.FC = () => {
  return (
    <div className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 w-32 sm:w-36 h-16 pointer-events-none select-none opacity-90 overflow-visible">
      {/* Cyan Light Speed Rays behind the car */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,183,255,0.18)] to-transparent blur-sm transform -skew-x-12" />
      <svg
        viewBox="0 0 160 80"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(0,183,255,0.8)] overflow-visible"
      >
        <defs>
          <linearGradient id="car-body" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#0284C7" />
            <stop offset="80%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
          <linearGradient id="car-glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="light-beam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00B7FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00B7FF" stopOpacity="0" />
          </linearGradient>
          <filter id="neon-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Headlight beams shooting left */}
        <polygon points="18,48 0,42 0,54" fill="url(#light-beam)" opacity="0.6" />
        <polygon points="26,52 0,48 0,60" fill="url(#light-beam)" opacity="0.4" />

        {/* Ground light reflection */}
        <ellipse cx="80" cy="66" rx="65" ry="5" fill="#00B7FF" opacity="0.25" filter="blur(3px)" />

        {/* Car Silhouette / Body */}
        {/* Main chassis */}
        <path
          d="M 18,50 
             C 22,46 36,44 48,42 
             C 60,32 78,24 105,24 
             C 125,24 138,32 148,44 
             C 152,48 156,54 154,58 
             C 150,62 135,62 125,62 
             C 120,54 112,54 107,62 
             C 85,62 58,62 52,62 
             C 47,54 39,54 34,62 
             C 24,62 16,58 18,50 Z"
          fill="url(#car-body)"
          stroke="#00FFFF"
          strokeWidth="1"
          filter="url(#neon-glow-blue)"
        />

        {/* Cockpit / Windshield */}
        <path
          d="M 54,40 C 65,31 82,26 102,26 C 118,26 128,32 134,40 Z"
          fill="url(#car-glass)"
          stroke="#38BDF8"
          strokeWidth="0.8"
        />

        {/* Aerodynamic side vent / crease line */}
        <path
          d="M 68,46 L 98,46 L 112,52 L 72,52 Z"
          fill="#082F49"
          stroke="#00B7FF"
          strokeWidth="0.6"
        />

        {/* Front Headlight (Electric Cyan LED) */}
        <polygon
          points="20,49 28,47 26,52 18,52"
          fill="#00FFFF"
          filter="drop-shadow(0 0 4px #00FFFF)"
        />

        {/* Front Wheel */}
        <circle cx="43" cy="58" r="8" fill="#020617" stroke="#00B7FF" strokeWidth="1.5" />
        <circle cx="43" cy="58" r="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="43" cy="58" r="2" fill="#00FFFF" />

        {/* Rear Wheel */}
        <circle cx="116" cy="58" r="8" fill="#020617" stroke="#00B7FF" strokeWidth="1.5" />
        <circle cx="116" cy="58" r="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="116" cy="58" r="2" fill="#00FFFF" />

        {/* Speed streak lines */}
        <line x1="8" y1="36" x2="40" y2="36" stroke="#00B7FF" strokeWidth="1.2" opacity="0.6" strokeDasharray="6 3" />
        <line x1="120" y1="20" x2="155" y2="20" stroke="#00FFFF" strokeWidth="1" opacity="0.5" strokeDasharray="8 4" />
        <line x1="125" y1="35" x2="160" y2="35" stroke="#38BDF8" strokeWidth="1" opacity="0.7" strokeDasharray="5 2" />
      </svg>
    </div>
  );
};

/**
 * Tumbling Red Dice with Fiery Sparks for K3 Card
 */
export const K3DiceArtwork: React.FC = () => {
  return (
    <div className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 w-28 sm:w-32 h-16 pointer-events-none select-none opacity-90 overflow-visible">
      {/* Fiery Amber glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,176,0,0.2)] to-transparent blur-sm" />
      <svg
        viewBox="0 0 140 80"
        className="w-full h-full drop-shadow-[0_0_14px_rgba(255,140,0,0.7)] overflow-visible"
      >
        <defs>
          <linearGradient id="dice-red-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="dice-top-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#FCA5A5" />
          </linearGradient>
          <linearGradient id="fire-spark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC83D" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Flying Sparks */}
        <circle cx="28" cy="22" r="1.5" fill="#FFC83D" filter="drop-shadow(0 0 3px #FFC83D)" />
        <circle cx="40" cy="14" r="2" fill="#FF9500" filter="drop-shadow(0 0 3px #FF9500)" />
        <circle cx="95" cy="18" r="1.5" fill="#FFC83D" filter="drop-shadow(0 0 3px #FFC83D)" />
        <circle cx="125" cy="46" r="2" fill="#FFA500" filter="drop-shadow(0 0 3px #FFA500)" />
        <circle cx="34" cy="55" r="1.2" fill="#FFC83D" />

        {/* Big Main 3D Die (Right-Center) */}
        <g transform="translate(48, 12)">
          {/* Top Face */}
          <polygon points="26,0 48,11 26,22 4,11" fill="url(#dice-top-1)" stroke="#FFE4E6" strokeWidth="0.8" />
          {/* Pips on Top Face (3 pips) */}
          <ellipse cx="14" cy="7" rx="2" ry="1.2" fill="#FFFFFF" />
          <ellipse cx="26" cy="11" rx="2" ry="1.2" fill="#FFFFFF" />
          <ellipse cx="38" cy="15" rx="2" ry="1.2" fill="#FFFFFF" />

          {/* Left Face */}
          <polygon points="4,11 26,22 26,48 4,37" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          {/* Pips on Left Face (4 pips) */}
          <circle cx="11" cy="22" r="2" fill="#FFFFFF" />
          <circle cx="19" cy="26" r="2" fill="#FFFFFF" />
          <circle cx="11" cy="34" r="2" fill="#FFFFFF" />
          <circle cx="19" cy="38" r="2" fill="#FFFFFF" />

          {/* Right Face */}
          <polygon points="26,22 48,11 48,37 26,48" fill="#991B1B" stroke="#7F1D1D" strokeWidth="0.8" />
          {/* Pips on Right Face (5 pips) */}
          <circle cx="33" cy="27" r="1.8" fill="#FFFFFF" />
          <circle cx="41" cy="23" r="1.8" fill="#FFFFFF" />
          <circle cx="37" cy="35" r="1.8" fill="#FFFFFF" />
          <circle cx="33" cy="43" r="1.8" fill="#FFFFFF" />
          <circle cx="41" cy="39" r="1.8" fill="#FFFFFF" />
        </g>

        {/* Small Tumbling Die (Bottom-Right) */}
        <g transform="translate(100, 36) rotate(25)">
          <polygon points="12,0 22,5 12,10 2,5" fill="url(#dice-top-1)" />
          <polygon points="2,5 12,10 12,22 2,17" fill="#DC2626" />
          <polygon points="12,10 22,5 22,17 12,22" fill="#991B1B" />
          <ellipse cx="12" cy="5" rx="1.5" ry="0.8" fill="#FFFFFF" />
          <circle cx="6" cy="11" r="1" fill="#FFFFFF" />
          <circle cx="6" cy="16" r="1" fill="#FFFFFF" />
          <circle cx="17" cy="11" r="1" fill="#FFFFFF" />
          <circle cx="17" cy="16" r="1" fill="#FFFFFF" />
        </g>

        {/* Amber speed streak arcs */}
        <path d="M 20,40 Q 42,28 55,20" stroke="#FFB000" strokeWidth="1.2" fill="none" opacity="0.6" strokeDasharray="4 2" />
        <path d="M 32,58 Q 60,50 82,45" stroke="#FF5500" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="5 3" />
      </svg>
    </div>
  );
};

/**
 * Cosmic 3D Purple Lottery Balls for 5D Card
 */
export const D5CosmicBallsArtwork: React.FC = () => {
  return (
    <div className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 w-32 sm:w-36 h-16 pointer-events-none select-none opacity-90 overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,32,200,0.2)] to-transparent blur-sm" />
      <svg
        viewBox="0 0 150 80"
        className="w-full h-full drop-shadow-[0_0_14px_rgba(255,32,200,0.7)] overflow-visible"
      >
        <defs>
          <radialGradient id="sphere-ball-5" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#F5D0FE" />
            <stop offset="35%" stopColor="#D946EF" />
            <stop offset="80%" stopColor="#86198F" />
            <stop offset="100%" stopColor="#4A044E" />
          </radialGradient>
          <radialGradient id="sphere-ball-6" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="35%" stopColor="#A855F7" />
            <stop offset="80%" stopColor="#6B21A8" />
            <stop offset="100%" stopColor="#3B0764" />
          </radialGradient>
          <radialGradient id="sphere-ball-9" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="35%" stopColor="#EC4899" />
            <stop offset="80%" stopColor="#9D174D" />
            <stop offset="100%" stopColor="#500724" />
          </radialGradient>
        </defs>

        {/* Floating background magenta stars */}
        <circle cx="16" cy="28" r="1.5" fill="#FF32DC" filter="drop-shadow(0 0 3px #FF32DC)" />
        <circle cx="48" cy="16" r="2" fill="#E879F9" filter="drop-shadow(0 0 3px #E879F9)" />
        <circle cx="132" cy="50" r="1.5" fill="#FF32DC" filter="drop-shadow(0 0 3px #FF32DC)" />

        {/* Small Ball 1 (Far left/top) */}
        <g transform="translate(32, 22)">
          <circle cx="10" cy="10" r="8" fill="url(#sphere-ball-9)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <ellipse cx="8" cy="6" rx="3.5" ry="1.8" fill="rgba(255,255,255,0.6)" transform="rotate(-20 8 6)" />
          <text x="10" y="14" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            1
          </text>
        </g>

        {/* Medium Ball (Ball 6, top center) */}
        <g transform="translate(68, 8)">
          <circle cx="13" cy="13" r="12" fill="url(#sphere-ball-6)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
          <ellipse cx="10" cy="8" rx="5" ry="2.5" fill="rgba(255,255,255,0.6)" transform="rotate(-20 10 8)" />
          <text x="13" y="18" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            6
          </text>
        </g>

        {/* Small Ball (Ball 9, top right) */}
        <g transform="translate(106, 16)">
          <circle cx="10" cy="10" r="9" fill="url(#sphere-ball-9)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
          <ellipse cx="8" cy="6" rx="3.8" ry="2" fill="rgba(255,255,255,0.6)" transform="rotate(-20 8 6)" />
          <text x="10" y="14" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            9
          </text>
        </g>

        {/* Big Forefront Ball (Ball 5, Center) */}
        <g transform="translate(48, 28)">
          <circle cx="22" cy="22" r="18" fill="url(#sphere-ball-5)" stroke="#F0ABFC" strokeWidth="1" />
          <ellipse cx="17" cy="14" rx="8" ry="4" fill="rgba(255,255,255,0.7)" transform="rotate(-20 17 14)" />
          {/* Inner ring for ball 5 */}
          <circle cx="22" cy="22" r="11" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="22" y="28" fill="#FFFFFF" fontSize="17" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            5
          </text>
        </g>

        {/* Orbit speed streaks */}
        <path d="M 12,50 C 40,30 90,20 140,40" stroke="#FF20C8" strokeWidth="1.2" fill="none" opacity="0.6" strokeDasharray="6 3" />
        <path d="M 28,62 C 60,45 100,38 135,55" stroke="#A020F0" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="4 2" />
      </svg>
    </div>
  );
};

/**
 * 3D Neon Turquoise/Cyan TRX Triangle Prism on Pedestal for TRX Card
 */
export const TrxPrismArtwork: React.FC = () => {
  return (
    <div className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 w-28 sm:w-32 h-16 pointer-events-none select-none opacity-90 overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,255,163,0.18)] to-transparent blur-sm" />
      <svg
        viewBox="0 0 130 80"
        className="w-full h-full drop-shadow-[0_0_14px_rgba(0,255,163,0.7)] overflow-visible"
      >
        <defs>
          <linearGradient id="trx-pedestal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFA3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="trx-prism-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="50%" stopColor="#00FFA3" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="trx-prism-face1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="trx-prism-face2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>

        {/* Glowing Platform Pedestal underneath */}
        <ellipse cx="65" cy="64" rx="42" ry="7" fill="url(#trx-pedestal)" stroke="#00FFA3" strokeWidth="1" />
        <ellipse cx="65" cy="64" rx="28" ry="4.5" fill="#00FFA3" opacity="0.3" filter="blur(2px)" />

        {/* Vertical light beam ascending from pedestal */}
        <polygon points="45,64 85,64 75,10 55,10" fill="url(#trx-pedestal)" opacity="0.25" />

        {/* 3D Inverted Triangle / Crystal TRX Emblem */}
        <g transform="translate(38, 12)">
          {/* Outer Triangle Outline */}
          <polygon
            points="27,48 2,4 52,4"
            fill="#062820"
            stroke="url(#trx-prism-outer)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Geometric Facets */}
          <polygon points="27,48 27,24 2,4" fill="url(#trx-prism-face2)" opacity="0.85" />
          <polygon points="27,48 27,24 52,4" fill="url(#trx-prism-face1)" opacity="0.9" />
          <polygon points="2,4 52,4 27,24" fill="#00FFA3" opacity="0.35" />

          {/* Center glowing inner triangle */}
          <polygon
            points="27,38 12,12 42,12"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Core Sparkle */}
          <circle cx="27" cy="20" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 4px #00FFFF)" />
        </g>

        {/* Cyber ground grid lines */}
        <line x1="30" y1="64" x2="10" y2="72" stroke="#00FFA3" strokeWidth="1" opacity="0.4" />
        <line x1="100" y1="64" x2="120" y2="72" stroke="#00FFA3" strokeWidth="1" opacity="0.4" />
        <line x1="65" y1="68" x2="65" y2="76" stroke="#00FFA3" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
};
