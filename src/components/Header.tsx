import React from 'react';
import { AdvanceHackLogo } from './AdvanceHackLogo';
import { CyberHackerArt } from './CyberHackerArt';
import { APP_CONFIG } from '../constants/config';

export const Header: React.FC = () => {
  return (
    <header className="relative pt-2 pb-1.5 px-1 select-none">
      {/* Top Row with AI POWERED Badge at Top-Right */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex-1" />
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-full bg-[#00FFA3] blur-sm opacity-50 animate-pulse" />
          <div className="relative font-mono text-[9.5px] text-[#00FFA3] border border-[#00FFA3] px-3 py-0.5 rounded-full bg-[rgba(6,18,14,0.95)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_12px_rgba(0,255,163,0.35)] font-black tracking-wider">
            <span className="text-[#00FFA3] text-xs">⚡</span>
            <span>AI POWERED</span>
          </div>
        </div>
      </div>

      {/* Main Header Row: Logo + Brand Title + Hooded Hacker Artwork */}
      <div className="relative flex items-center justify-between gap-1.5">
        {/* Left Crown Emblem */}
        <AdvanceHackLogo size={62} />

        {/* Center Typography */}
        <div className="flex-1 min-w-0 pr-1 pl-1">
          <h1 className="text-[24px] sm:text-[28px] font-black italic tracking-wide leading-none text-white font-ui drop-shadow-[0_2px_14px_rgba(114,0,255,0.6)]">
            <span className="bg-gradient-to-r from-white via-[#EDE9FE] to-[#C4B5FD] bg-clip-text text-transparent">
              ADVANCE
            </span>
          </h1>
          <div className="text-[9.5px] sm:text-[10px] font-mono tracking-wider font-extrabold text-[#FFC83D] mt-1.5 flex items-center gap-1 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,200,61,0.6)]">
            <span className="opacity-75 text-[#A020F0]">═</span>
            <span className="text-white opacity-95">PREMIUM SIGNAL HUB</span>
            <span className="opacity-75 text-[#A020F0]">═</span>
          </div>
        </div>

        {/* Right Hooded Cyber Hacker Artwork */}
        <div className="relative -mr-1 -my-3 flex-shrink-0">
          <CyberHackerArt size={98} withLightning={true} imageUrl={APP_CONFIG.profileImage} />
        </div>
      </div>
    </header>
  );
};
