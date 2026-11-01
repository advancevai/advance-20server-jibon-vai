import React from 'react';

interface ProTradersCardProps {
  onExplore: () => void;
}

export const ProTradersCard: React.FC<ProTradersCardProps> = ({ onExplore }) => {
  return (
    <div className="relative rounded-2xl mb-3.5 p-[1.5px] select-none group">
      {/* Outer Golden Ambient Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFC83D] via-[#FF9500] to-[#EA580C] opacity-90 shadow-[0_0_24px_rgba(255,200,61,0.55)] group-hover:opacity-100 transition-opacity" />

      {/* Main Inner Card */}
      <div className="relative rounded-[15px] p-4 bg-gradient-to-br from-[#1C1004] via-[#100600] to-[#050200] overflow-hidden vip-card-shine border border-[rgba(255,200,61,0.4)]">
        {/* Diagonal Golden Ray Sweep in Background */}
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(255,200,61,0.3)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,200,61,0.08)] to-transparent" />

        {/* Diagonal Golden Speed Bands (as seen in screenshot behind lightning) */}
        <div className="pointer-events-none absolute top-0 right-10 w-24 h-full overflow-hidden opacity-25">
          <div className="w-8 h-40 bg-gradient-to-b from-[#FFC83D] to-transparent transform rotate-45 translate-x-4 -translate-y-8 blur-xs" />
          <div className="w-4 h-40 bg-gradient-to-b from-[#FFA500] to-transparent transform rotate-45 translate-x-12 -translate-y-4 blur-xs" />
        </div>

        {/* Top Row: Crown + Title Details + Big Lightning */}
        <div className="relative z-10 flex items-center gap-3.5 mb-3.5">
          {/* Left: 3D Golden Crown Artwork with Jewels */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#331C04] via-[#211101] to-[#0A0400] border border-[#FFC83D] flex items-center justify-center flex-shrink-0 shadow-[0_0_22px_rgba(255,200,61,0.5)]">
            <svg
              viewBox="0 0 60 60"
              className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(255,200,61,0.9)] animate-float-gentle overflow-visible"
            >
              <defs>
                <linearGradient id="vip-crown-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="30%" stopColor="#FDE047" />
                  <stop offset="70%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
              </defs>
              {/* Crown Base */}
              <path
                d="M 10,44 L 6,18 L 20,28 L 30,8 L 40,28 L 54,18 L 50,44 Z"
                fill="url(#vip-crown-gold)"
                stroke="#FEF08A"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Crown Band */}
              <rect x="9" y="42" width="42" height="6" rx="2" fill="#B45309" stroke="#FEF08A" strokeWidth="0.8" />
              {/* Jewels */}
              <circle cx="30" cy="8" r="2.8" fill="#FF2B5E" stroke="#FFF" strokeWidth="0.8" />
              <circle cx="6" cy="18" r="2.2" fill="#00B7FF" stroke="#FFF" strokeWidth="0.6" />
              <circle cx="54" cy="18" r="2.2" fill="#00B7FF" stroke="#FFF" strokeWidth="0.6" />
              <circle cx="20" cy="45" r="1.8" fill="#FF2B5E" />
              <circle cx="30" cy="45" r="2" fill="#00FFA3" />
              <circle cx="40" cy="45" r="1.8" fill="#00B7FF" />
            </svg>
          </div>

          {/* Center Details */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-black text-white tracking-wide">
                Pro Traders
              </span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFC83D] to-[#FFA000] text-black tracking-wider uppercase shadow-[0_0_12px_rgba(255,200,61,0.7)]">
                VIP
              </span>
            </div>

            <div className="text-[11.5px] text-[#CBD5E1] mt-0.5 truncate">
              WinGo 20 Logic · Big/Small + Red/Green
            </div>

            <div className="text-[11px] text-[#00FFA3] flex items-center gap-1.5 mt-1 font-extrabold drop-shadow-[0_0_8px_rgba(0,255,163,0.7)]">
              <span>👑</span>
              <span className="tracking-wide">Premium Access</span>
            </div>
          </div>

          {/* Right: Big Glowing Electric Lightning Bolt */}
          <div className="relative flex-shrink-0 -mr-1">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="drop-shadow-[0_0_18px_rgba(255,200,61,0.95)] animate-pulse"
            >
              <defs>
                <linearGradient id="gold-bolt-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#FFF08A" />
                  <stop offset="70%" stopColor="#FFC83D" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                fill="url(#gold-bolt-glow)"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Row: Achievement Icons + EXPLORE Button */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[rgba(255,200,61,0.22)]">
          {/* Left mini badges */}
          <div className="flex items-center gap-1.5">
            {[
              { icon: '👑', border: 'border-[#FFC83D]', glow: 'rgba(255,200,61,0.3)' },
              { icon: '🏵️', border: 'border-[#00FFA3]', glow: 'rgba(0,255,163,0.3)' },
              { icon: '⭐', border: 'border-[#FFC83D]', glow: 'rgba(255,200,61,0.3)' },
              { icon: '🔥', border: 'border-[#FF5500]', glow: 'rgba(255,85,0,0.3)' },
              { icon: '🚀', border: 'border-[#FFB000]', glow: 'rgba(255,176,0,0.3)' },
            ].map((item, idx) => (
              <span
                key={idx}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs bg-[rgba(10,5,0,0.8)] border ${item.border} backdrop-blur-sm shadow-[0_0_8px_${item.glow}]`}
              >
                {item.icon}
              </span>
            ))}
            <span className="text-[11.5px] font-mono text-white font-extrabold ml-1">
              +15
            </span>
          </div>

          {/* Right EXPLORE button (Bright Gold Gradient with Black Font) */}
          <button
            onClick={onExplore}
            className="font-mono text-[11px] font-black text-black bg-gradient-to-r from-[#FFC83D] via-[#FFB000] to-[#FF8C00] border border-[#FFE270] px-4 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,200,61,0.8)] transition-all active:scale-95 shadow-[0_0_14px_rgba(255,200,61,0.5)]"
          >
            <span>EXPLORE</span>
            <span className="text-xs font-black">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
