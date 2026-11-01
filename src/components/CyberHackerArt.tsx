import React, { useState } from 'react';

interface CyberHackerArtProps {
  className?: string;
  size?: number;
  withLightning?: boolean;
  imageUrl?: string;
}

export const CyberHackerArt: React.FC<CyberHackerArtProps> = ({
  className = '',
  size = 110,
  withLightning = true,
  imageUrl,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Neon Lightning Sparks if enabled */}
      {withLightning && (
        <svg
          viewBox="0 0 160 160"
          className="absolute -inset-3 w-[120%] h-[120%] overflow-visible opacity-75 animate-pulse pointer-events-none"
        >
          <defs>
            <filter id="lightning-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="purple-lightning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A020F0" />
              <stop offset="50%" stopColor="#7200FF" />
              <stop offset="100%" stopColor="#00B7FF" />
            </linearGradient>
          </defs>
          {/* Lightning arcs */}
          <path
            d="M 25,65 L 42,75 L 36,88 L 52,94"
            fill="none"
            stroke="url(#purple-lightning-grad)"
            strokeWidth="1.8"
            filter="url(#lightning-glow)"
            strokeLinecap="round"
          />
          <path
            d="M 135,55 L 118,72 L 124,84 L 110,98"
            fill="none"
            stroke="url(#purple-lightning-grad)"
            strokeWidth="1.8"
            filter="url(#lightning-glow)"
            strokeLinecap="round"
          />
          <path
            d="M 78,15 L 85,28 L 80,36 L 90,44"
            fill="none"
            stroke="#00B7FF"
            strokeWidth="1.5"
            filter="url(#lightning-glow)"
            strokeLinecap="round"
          />
          {/* Ambient Purple Cloud behind hood */}
          <circle cx="80" cy="80" r="45" fill="rgba(160,32,240,0.22)" filter="url(#lightning-glow)" />
        </svg>
      )}

      {/* Main Artwork: Image (if provided and valid) or Vector Cyber Hooded SVG */}
      {imageUrl && !imgFailed ? (
        <div className="relative w-[85%] h-[85%] rounded-2xl p-[2px] bg-gradient-to-b from-[#A020F0] via-[#7200FF] to-[#00B7FF] shadow-[0_0_20px_rgba(160,32,240,0.7)] flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Advance Cyber Character"
            className="w-full h-full object-cover rounded-[14px]"
            onError={() => setImgFailed(true)}
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 120 120"
          className="relative w-full h-full drop-shadow-[0_0_16px_rgba(160,32,240,0.6)]"
        >
        <defs>
          {/* Neon Glow Filter */}
          <filter id="neon-mask-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hood Gradient */}
          <linearGradient id="hood-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B0E33" />
            <stop offset="50%" stopColor="#0B0718" />
            <stop offset="100%" stopColor="#05030A" />
          </linearGradient>

          {/* Neon Hood Rim Stroke Gradient */}
          <linearGradient id="hood-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A020F0" />
            <stop offset="50%" stopColor="#FF32DC" />
            <stop offset="100%" stopColor="#7200FF" />
          </linearGradient>
        </defs>

        {/* Shoulders / Torso */}
        <path
          d="M 15,115 C 22,88 38,82 60,82 C 82,82 98,88 105,115 Z"
          fill="url(#hood-grad)"
          stroke="url(#hood-rim-grad)"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Outer Hood Contour */}
        <path
          d="M 60,12 C 40,12 28,26 25,48 C 22,68 28,86 42,92 C 48,94 54,95 60,95 C 66,95 72,94 78,92 C 92,86 98,68 95,48 C 92,26 80,12 60,12 Z"
          fill="url(#hood-grad)"
          stroke="url(#hood-rim-grad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Hood Dark Shadow Cavity */}
        <path
          d="M 60,20 C 44,20 34,34 32,52 C 30,70 36,84 48,87 C 52,88 56,89 60,89 C 64,89 68,88 72,87 C 84,84 90,70 88,52 C 86,34 76,20 60,20 Z"
          fill="#020106"
        />

        {/* Hood Fold Creases (Cyber detailing) */}
        <path
          d="M 60,14 L 60,26"
          stroke="rgba(160,32,240,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 40,24 C 44,32 46,40 45,50"
          stroke="rgba(160,32,240,0.4)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 80,24 C 76,32 74,40 75,50"
          stroke="rgba(160,32,240,0.4)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Glowing Mask Eyes: Left 'X' */}
        <g filter="url(#neon-mask-glow)">
          <line
            x1="43"
            y1="46"
            x2="53"
            y2="56"
            stroke="#C084FC"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <line
            x1="53"
            y1="46"
            x2="43"
            y2="56"
            stroke="#C084FC"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Eye inner hot core */}
          <line
            x1="43"
            y1="46"
            x2="53"
            y2="56"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="53"
            y1="46"
            x2="43"
            y2="56"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Glowing Mask Eyes: Right 'X' */}
          <line
            x1="67"
            y1="46"
            x2="77"
            y2="56"
            stroke="#C084FC"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <line
            x1="77"
            y1="46"
            x2="67"
            y2="56"
            stroke="#C084FC"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Eye inner hot core */}
          <line
            x1="67"
            y1="46"
            x2="77"
            y2="56"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="77"
            y1="46"
            x2="67"
            y2="56"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Stitched Sinister Smile Curve */}
          <path
            d="M 42,68 Q 60,82 78,68"
            fill="none"
            stroke="#C084FC"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 42,68 Q 60,82 78,68"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Vertical Stitch Stitches */}
          <line x1="48" y1="68" x2="48" y2="74" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="54" y1="70" x2="54" y2="77" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="71" x2="60" y2="78" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="66" y1="70" x2="66" y2="77" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="68" x2="72" y2="74" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />

          {/* Stitch white cores */}
          <line x1="48" y1="69" x2="48" y2="73" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <line x1="54" y1="71" x2="54" y2="76" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <line x1="60" y1="72" x2="60" y2="77" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <line x1="66" y1="71" x2="66" y2="76" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <line x1="72" y1="69" x2="72" y2="73" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
        </g>
      </svg>
      )}
    </div>
  );
};
