import React from 'react';

/**
 * Mini Golden Crown component to sit atop game icons as seen in the screenshot
 */
const MiniIconCrown: React.FC = () => (
  <g transform="translate(20, 2)">
    <path
      d="M 6,10 L 4,3 L 9,6 L 12,1 L 15,6 L 20,3 L 18,10 Z"
      fill="#FFC83D"
      stroke="#FEF08A"
      strokeWidth="0.8"
      strokeLinejoin="round"
      filter="drop-shadow(0 0 3px #FFC83D)"
    />
    <circle cx="12" cy="1" r="1" fill="#FF20C8" />
    <circle cx="4" cy="3" r="0.8" fill="#00B7FF" />
    <circle cx="20" cy="3" r="0.8" fill="#00B7FF" />
  </g>
);

export const WingoGameIcon: React.FC<{ size?: number }> = ({ size = 46 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible">
      <defs>
        <radialGradient id="ball-green" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="35%" stopColor="#10B981" />
          <stop offset="90%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </radialGradient>
        <radialGradient id="ball-red" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="35%" stopColor="#F43F5E" />
          <stop offset="90%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="ball-purple" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#D8B4FE" />
          <stop offset="35%" stopColor="#9333EA" />
          <stop offset="90%" stopColor="#6B21A8" />
          <stop offset="100%" stopColor="#3B0764" />
        </radialGradient>
        <filter id="ball-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
        </filter>
      </defs>

      {/* Mini Golden Crown on top */}
      <MiniIconCrown />

      {/* Green Ball 'W' */}
      <g filter="url(#ball-shadow)">
        <circle cx="19" cy="27" r="13" fill="url(#ball-green)" />
        <ellipse cx="16" cy="22" rx="5" ry="2.5" fill="rgba(255,255,255,0.5)" transform="rotate(-20 16 22)" />
        <text
          x="19"
          y="32"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          W
        </text>
      </g>

      {/* Red Ball 'G' */}
      <g filter="url(#ball-shadow)">
        <circle cx="43" cy="27" r="13" fill="url(#ball-red)" />
        <ellipse cx="40" cy="22" rx="5" ry="2.5" fill="rgba(255,255,255,0.5)" transform="rotate(-20 40 22)" />
        <text
          x="43"
          y="32"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          G
        </text>
      </g>

      {/* Purple Ball 'O' */}
      <g filter="url(#ball-shadow)">
        <circle cx="31" cy="46" r="13" fill="url(#ball-purple)" />
        <ellipse cx="28" cy="41" rx="5" ry="2.5" fill="rgba(255,255,255,0.5)" transform="rotate(-20 28 41)" />
        <text
          x="31"
          y="51"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          O
        </text>
      </g>
    </svg>
  );
};

export const K3DiceIcon: React.FC<{ size?: number }> = ({ size = 46 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible">
      <defs>
        <linearGradient id="dice-top" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F87171" />
        </linearGradient>
        <linearGradient id="dice-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="dice-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <filter id="dice-glow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(255,100,50,0.6)" />
        </filter>
      </defs>

      {/* Mini Golden Crown on top */}
      <MiniIconCrown />

      <g filter="url(#dice-glow)" transform="translate(0, 4)">
        {/* Top Face */}
        <polygon points="32,12 50,23 32,34 14,23" fill="url(#dice-top)" stroke="#FCA5A5" strokeWidth="0.6" />
        {/* Left Face */}
        <polygon points="14,23 32,34 32,53 14,42" fill="url(#dice-left)" />
        {/* Right Face */}
        <polygon points="32,34 50,23 50,42 32,53" fill="url(#dice-right)" />

        {/* Dice Pip Top (Pip 1) */}
        <ellipse cx="32" cy="23" rx="3" ry="1.8" fill="#FFFFFF" />

        {/* Dice Pips Left (Pip 3) */}
        <circle cx="21" cy="30" r="2" fill="#FFFFFF" />
        <circle cx="26" cy="37" r="2" fill="#FFFFFF" />
        <circle cx="21" cy="44" r="2" fill="#FFFFFF" />

        {/* Dice Pips Right (Pip 4) */}
        <circle cx="38" cy="37" r="1.8" fill="#FFFFFF" />
        <circle cx="45" cy="31" r="1.8" fill="#FFFFFF" />
        <circle cx="38" cy="46" r="1.8" fill="#FFFFFF" />
        <circle cx="45" cy="40" r="1.8" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

export const D5SphereIcon: React.FC<{ size?: number }> = ({ size = 46 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible">
      <defs>
        <radialGradient id="d5-main-sphere" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="40%" stopColor="#A855F7" />
          <stop offset="80%" stopColor="#6B21A8" />
          <stop offset="100%" stopColor="#3B0764" />
        </radialGradient>
        <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFA3" />
          <stop offset="50%" stopColor="#00B7FF" />
          <stop offset="100%" stopColor="#FF32DC" />
        </linearGradient>
      </defs>

      {/* Mini Golden Crown on top */}
      <MiniIconCrown />

      {/* Orbit Ring */}
      <ellipse
        cx="32"
        cy="36"
        rx="24"
        ry="9"
        fill="none"
        stroke="url(#orbit-grad)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        transform="rotate(-20 32 36)"
        opacity="0.8"
      />

      {/* Small floating orbiting spheres */}
      <circle cx="10" cy="28" r="3" fill="#00FFA3" filter="drop-shadow(0 0 3px #00FFA3)" />
      <circle cx="54" cy="44" r="3" fill="#00B7FF" filter="drop-shadow(0 0 3px #00B7FF)" />
      <circle cx="46" cy="18" r="2" fill="#FF32DC" filter="drop-shadow(0 0 2px #FF32DC)" />

      {/* Center 5D Sphere */}
      <circle
        cx="32"
        cy="36"
        r="16"
        fill="url(#d5-main-sphere)"
        filter="drop-shadow(0 3px 8px rgba(168,85,247,0.7))"
      />
      <ellipse cx="28" cy="29" rx="6" ry="3" fill="rgba(255,255,255,0.4)" transform="rotate(-20 28 29)" />

      {/* 5D Typography */}
      <text
        x="32"
        y="42"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="900"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.5"
      >
        5D
      </text>
    </svg>
  );
};

export const TrxCrystalIcon: React.FC<{ size?: number }> = ({ size = 46 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="overflow-visible">
      <defs>
        <linearGradient id="crystal-face1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="crystal-face2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="crystal-face3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#082F49" />
        </linearGradient>
        <filter id="trx-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(0,183,255,0.8)" />
        </filter>
      </defs>

      <g filter="url(#trx-glow)" transform="translate(0, 2)">
        {/* Crystal Outer Diamond Geometry */}
        <polygon points="32,6 52,22 32,56 12,22" fill="url(#crystal-face3)" />
        <polygon points="32,6 52,22 32,36" fill="url(#crystal-face1)" />
        <polygon points="32,6 12,22 32,36" fill="url(#crystal-face2)" />
        <polygon points="12,22 32,36 32,56" fill="url(#crystal-face1)" />
        <polygon points="52,22 32,36 32,56" fill="url(#crystal-face2)" />

        {/* Crystal Highlights */}
        <line x1="32" y1="6" x2="32" y2="56" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <line x1="12" y1="22" x2="52" y2="22" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />

        {/* TRX text at bottom */}
        <text
          x="32"
          y="49"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.8"
        >
          TRX
        </text>
      </g>
    </svg>
  );
};
