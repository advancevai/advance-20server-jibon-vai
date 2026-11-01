import React from 'react';
import { GameMode, MarketType } from '../types';
import { GAME_CONFIGS } from '../constants/games';
import { APP_CONFIG } from '../constants/config';
import { AdvanceHackLogo } from './AdvanceHackLogo';

interface MarketChoiceViewProps {
  mode: GameMode;
  onSelect: (market: MarketType) => void;
  onBack: () => void;
}

export const MarketChoiceView: React.FC<MarketChoiceViewProps> = ({ mode, onSelect, onBack }) => {
  const config = GAME_CONFIGS[mode];
  const badgeLabel = `${config.badge} MARKET`;

  const markets: {
    market: MarketType;
    name: string;
    sub: string;
    tag: string;
    badge: string;
    glowColor: string;
    borderColor: string;
    borderClass: string;
    tagClass: string;
  }[] = [
    {
      market: 'big-small',
      name: APP_CONFIG.name,
      sub: badgeLabel,
      tag: 'BIG / SMALL',
      badge: 'B/S',
      glowColor: 'rgba(0,229,168,0.35)',
      borderColor: 'rgba(0,229,168,0.5)',
      borderClass: 'anim-border-neon',
      tagClass: 'bg-gradient-to-r from-[rgba(0,229,168,0.18)] to-[rgba(180,92,255,0.18)] border-[rgba(0,229,168,0.45)]',
    },
    {
      market: 'red-green',
      name: APP_CONFIG.name,
      sub: badgeLabel,
      tag: 'RED / GREEN',
      badge: 'R/G',
      glowColor: 'rgba(0,255,163,0.4)',
      borderColor: 'rgba(0,255,163,0.5)',
      borderClass: 'anim-border-neon',
      tagClass: 'bg-[rgba(0,255,163,0.15)] text-[#00FFA3] border-[rgba(0,255,163,0.5)]',
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* Top Navbar */}
      <div className="flex items-center gap-3 px-1 pt-3 pb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl border border-[rgba(160,32,240,0.4)] bg-[#0B0718] flex items-center justify-center cursor-pointer text-white text-base transition-all hover:border-[#00B7FF] hover:shadow-[0_0_12px_rgba(0,183,255,0.4)] active:scale-95"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="text-base font-black text-white">{config.label}</div>
          <div className="text-[11px] text-[#A8A3B8] font-mono">Select Market Type</div>
        </div>
      </div>

      {/* 2 Premium Market Cards */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {markets.map((item) => (
          <div
            key={item.market}
            className={`${item.borderClass} cursor-pointer transition-all duration-200 hover:-translate-y-1 active:scale-95`}
            onClick={() => onSelect(item.market)}
          >
            <div className="anim-border-inner p-4 relative overflow-hidden bg-gradient-to-br from-[#0B0718] to-[#140C2C]">
              {/* Radial Ambient Glow */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, ${item.glowColor}, transparent 70%)`,
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <AdvanceHackLogo size={46} />
                  <span
                    className="font-mono text-[10px] font-black px-2 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: item.borderColor,
                      boxShadow: `0 0 10px ${item.glowColor}`,
                    }}
                  >
                    {item.market === 'big-small' ? (
                      <span>
                        <span className="text-[#00E5A8]">B</span>
                        <span className="text-white/40 mx-0.5">/</span>
                        <span className="text-[#B45CFF]">S</span>
                      </span>
                    ) : (
                      <span className="text-[#00FFA3]">{item.badge}</span>
                    )}
                  </span>
                </div>

                <div className="text-[14.5px] font-black text-white tracking-wide">
                  {item.name}
                </div>
                <div className="text-[10px] text-[#A8A3B8] font-mono mt-0.5 tracking-wider">
                  {item.sub}
                </div>

                <div
                  className={`text-[10px] font-black mt-3 inline-block px-2.5 py-1 rounded-md border tracking-wider ${item.tagClass}`}
                >
                  {item.market === 'big-small' ? (
                    <span>
                      <span className="text-[#00E5A8]">BIG</span>
                      <span className="text-white/40 mx-1">/</span>
                      <span className="text-[#B45CFF]">SMALL</span>
                    </span>
                  ) : (
                    item.tag
                  )}
                </div>

                <div
                  className="text-[10.5px] mt-2.5 flex items-center gap-1.5 font-bold"
                  style={{ color: item.market === 'big-small' ? '#00E5A8' : '#00FFA3' }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-live-dot"
                    style={{
                      backgroundColor: item.market === 'big-small' ? '#00E5A8' : '#00FFA3',
                      boxShadow: `0 0 8px ${item.market === 'big-small' ? '#00E5A8' : '#00FFA3'}`,
                    }}
                  />
                  <span>LIVE</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Label */}
      <div className="text-center text-[11px] text-[#A8A3B8] font-mono tracking-widest uppercase mt-8 pb-2">
        <span className="text-[#00FFA3] font-bold">{APP_CONFIG.name}</span> · {config.label}
      </div>
    </div>
  );
};
