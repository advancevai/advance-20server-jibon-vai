import React from 'react';
import { GameMode } from '../types';
import {
  D5CosmicBallsArtwork,
  K3DiceArtwork,
  TrxPrismArtwork,
  WingoSupercarArtwork,
} from './GameCardArtwork';

interface SubCardItem {
  mode: GameMode;
  icon: string;
  name: string;
  desc: string;
  badge: string;
}

interface GameCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentType: 'wingo' | 'k3' | 'd5' | 'trx';
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  subCards: SubCardItem[];
  openGrid: (mode: GameMode) => void;
  modeCount: number;
}

const THEMES = {
  wingo: {
    borderGrad: 'from-[#00B7FF] via-[#00FFFF] to-[#0284C7]',
    glowColor: 'rgba(0, 183, 255, 0.55)',
    innerBg: 'from-[#03091F] via-[#020512] to-[#010208]',
    lightSweep: 'rgba(0, 183, 255, 0.12)',
    iconBorder: 'border-[#00B7FF]',
    iconGlow: '0 0 16px rgba(0, 183, 255, 0.5)',
    badgeBg: 'rgba(0, 255, 163, 0.15)',
    badgeText: '#00FFA3',
    badgeBorder: 'border-[#00FFA3]',
    liveDot: 'bg-[#00FFA3]',
    liveText: 'text-[#00FFA3]',
    btnBg: 'bg-gradient-to-r from-[#0088FF] to-[#00D4FF]',
    btnBorder: 'border-[#00FFFF]',
    btnShadow: 'shadow-[0_0_18px_rgba(0,183,255,0.7)]',
    numberBadgeBg: 'bg-[#00FFA3]',
    numberBadgeText: 'text-black',
  },
  k3: {
    borderGrad: 'from-[#FFB000] via-[#FF7700] to-[#E11D48]',
    glowColor: 'rgba(255, 176, 0, 0.55)',
    innerBg: 'from-[#190901] via-[#0D0400] to-[#040100]',
    lightSweep: 'rgba(255, 176, 0, 0.12)',
    iconBorder: 'border-[#FFB000]',
    iconGlow: '0 0 16px rgba(255, 176, 0, 0.5)',
    badgeBg: 'rgba(255, 176, 0, 0.15)',
    badgeText: '#FFC83D',
    badgeBorder: 'border-[#FFC83D]',
    liveDot: 'bg-[#00FFA3]',
    liveText: 'text-[#00FFA3]',
    btnBg: 'bg-gradient-to-r from-[#FF9500] to-[#FF5500]',
    btnBorder: 'border-[#FFC83D]',
    btnShadow: 'shadow-[0_0_18px_rgba(255,176,0,0.7)]',
    numberBadgeBg: 'bg-[#FFC83D]',
    numberBadgeText: 'text-black',
  },
  d5: {
    borderGrad: 'from-[#FF20C8] via-[#D946EF] to-[#9333EA]',
    glowColor: 'rgba(255, 32, 200, 0.55)',
    innerBg: 'from-[#190220] via-[#0C0110] to-[#040006]',
    lightSweep: 'rgba(255, 32, 200, 0.12)',
    iconBorder: 'border-[#FF20C8]',
    iconGlow: '0 0 16px rgba(255, 32, 200, 0.5)',
    badgeBg: 'rgba(255, 32, 200, 0.15)',
    badgeText: '#FF20C8',
    badgeBorder: 'border-[#FF20C8]',
    liveDot: 'bg-[#FF20C8]',
    liveText: 'text-[#FF20C8]',
    btnBg: 'bg-gradient-to-r from-[#FF20C8] to-[#A020F0]',
    btnBorder: 'border-[#FF70E0]',
    btnShadow: 'shadow-[0_0_18px_rgba(255,32,200,0.7)]',
    numberBadgeBg: 'bg-[#FF20C8]',
    numberBadgeText: 'text-white',
  },
  trx: {
    borderGrad: 'from-[#00FFA3] via-[#00FFFF] to-[#0284C7]',
    glowColor: 'rgba(0, 255, 163, 0.55)',
    innerBg: 'from-[#01180E] via-[#010C07] to-[#000402]',
    lightSweep: 'rgba(0, 255, 163, 0.12)',
    iconBorder: 'border-[#00FFA3]',
    iconGlow: '0 0 16px rgba(0, 255, 163, 0.5)',
    badgeBg: 'rgba(0, 255, 255, 0.15)',
    badgeText: '#00FFFF',
    badgeBorder: 'border-[#00FFFF]',
    liveDot: 'bg-[#00FFFF]',
    liveText: 'text-[#00FFFF]',
    btnBg: 'bg-gradient-to-r from-[#00C782] to-[#00D4FF]',
    btnBorder: 'border-[#00FFA3]',
    btnShadow: 'shadow-[0_0_18px_rgba(0,255,163,0.7)]',
    numberBadgeBg: 'bg-[#00FFA3]',
    numberBadgeText: 'text-black',
  },
};

export const GameCard: React.FC<GameCardProps> = ({
  title,
  subtitle,
  icon,
  accentType,
  expanded,
  setExpanded,
  subCards,
  openGrid,
  modeCount,
}) => {
  const theme = THEMES[accentType];

  return (
    <div className="relative rounded-2xl mb-3 p-[1.5px] select-none group transition-all duration-300">
      {/* Outer Glowing Gradient Border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${theme.borderGrad} opacity-90 group-hover:opacity-100 transition-opacity`}
        style={{
          boxShadow: `0 0 20px ${theme.glowColor}`,
        }}
      />

      {/* Main Inner Card */}
      <div
        className={`relative rounded-[15px] bg-gradient-to-b ${theme.innerBg} p-3.5 backdrop-blur-xl overflow-hidden`}
      >
        {/* Subtle Diagonal Aurora Light Reflection */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `linear-gradient(115deg, transparent 20%, ${theme.lightSweep} 50%, transparent 80%)`,
          }}
        />

        {/* Themed Right-Side Illustration Artwork */}
        {accentType === 'wingo' && <WingoSupercarArtwork />}
        {accentType === 'k3' && <K3DiceArtwork />}
        {accentType === 'd5' && <D5CosmicBallsArtwork />}
        {accentType === 'trx' && <TrxPrismArtwork />}

        {/* Card Header Row */}
        <div
          className="relative z-10 flex items-center gap-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {/* Left Game Icon Box with Crown & Mode Count Badge */}
          <div
            className={`relative w-14 h-14 rounded-2xl bg-[rgba(5,2,12,0.92)] flex items-center justify-center flex-shrink-0 border p-1 shadow-inner ${theme.iconBorder}`}
            style={{
              boxShadow: theme.iconGlow,
            }}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              {icon}
            </div>

            {/* Bottom-right circular mode count badge */}
            <span
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-black border-2 border-[#090514] shadow-md ${theme.numberBadgeBg} ${theme.numberBadgeText}`}
            >
              {modeCount}
            </span>
          </div>

          {/* Details (Middle) */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-[17.5px] font-black text-white tracking-wide">
                {title}
              </span>
              <span
                className={`text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${theme.badgeBorder}`}
                style={{
                  backgroundColor: theme.badgeBg,
                  color: theme.badgeText,
                }}
              >
                ACTIVE
              </span>
            </div>

            <div className="text-[11px] text-[#A8A3B8] mt-0.5 truncate max-w-[190px] sm:max-w-none">
              {subtitle}
            </div>

            {/* Live Indicator */}
            <div className={`text-[10.5px] mt-1 flex items-center gap-1.5 font-bold ${theme.liveText}`}>
              <span className={`w-2 h-2 rounded-full animate-live-dot ${theme.liveDot}`} />
              <span className="tracking-wide">Live Now</span>
            </div>
          </div>

          {/* Right Circular Glowing Action Button with Double Chevron >> */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (subCards.length === 1) {
                openGrid(subCards[0].mode);
              } else {
                setExpanded(!expanded);
              }
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-black border cursor-pointer transition-all duration-300 active:scale-90 flex-shrink-0 z-20 ${theme.btnBg} ${theme.btnBorder} ${theme.btnShadow} ${
              expanded ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 18 13 12 7 6" />
              <polyline points="13 18 19 12 13 6" />
            </svg>
          </button>
        </div>

        {/* Sub-modes Grid (Expanded View) */}
        {expanded && (
          <div className="relative z-10 mt-3.5 pt-3.5 border-t border-[rgba(255,255,255,0.08)] animate-fade-in">
            <div
              className={`grid ${
                subCards.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              } gap-2`}
            >
              {subCards.map((sub) => (
                <div
                  key={sub.mode}
                  className="rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border border-[rgba(255,255,255,0.12)] bg-[rgba(6,3,15,0.85)] hover:border-[#00B7FF] hover:shadow-[0_0_14px_rgba(0,183,255,0.4)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGrid(sub.mode);
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">{sub.icon}</span>
                    <span className="font-mono text-[9px] font-black px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-white border border-[rgba(255,255,255,0.18)]">
                      {sub.badge}
                    </span>
                  </div>
                  <div className="text-[12px] font-bold text-white">{sub.name}</div>
                  <div className="text-[10px] text-[#A8A3B8]">{sub.desc}</div>
                  <div className="text-[9.5px] text-[#00FFA3] mt-1.5 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-live-dot" />
                    <span>ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
