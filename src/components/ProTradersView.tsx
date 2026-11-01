import React from 'react';
import { GameMode, MarketType } from '../types';

interface ProTradersViewProps {
  onBack: () => void;
  onSelectModeMarket: (mode: GameMode, market: MarketType) => void;
}

const MODES: { mode: GameMode; icon: string; name: string; badge: string }[] = [
  { mode: '30s', icon: '⚡', name: '𝐖𝐈𝐍𝐆𝐎 𝟑𝟎 𝐒𝐄𝐂', badge: '30S' },
  { mode: '1m', icon: '⏱️', name: '𝐖𝐈𝐍𝐆𝐎 𝟏 𝐌𝐈𝐍', badge: '1M' },
  { mode: '3m', icon: '⏳', name: '𝐖𝐈𝐍𝐆𝐎 𝟑 𝐌𝐈𝐍', badge: '3M' },
  { mode: '5m', icon: '🕐', name: '𝐖𝐈𝐍𝐆𝐎 𝟓 𝐌𝐈𝐍', badge: '5M' },
];

export const ProTradersView: React.FC<ProTradersViewProps> = ({ onBack, onSelectModeMarket }) => {
  return (
    <div className="animate-fade-up">
      {/* Top Navbar */}
      <div className="flex items-center gap-3 px-1 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl border border-[rgba(255,200,61,0.3)] bg-[#0B0718] flex items-center justify-center cursor-pointer text-white text-base transition-all hover:border-[#ffc83d] hover:shadow-[0_0_12px_rgba(255,200,61,0.3)] active:scale-95"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="text-base font-black text-white flex items-center gap-2">
            <span>👑 Pro Traders</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[rgba(255,200,61,0.25)] to-[rgba(255,149,0,0.25)] text-[#ffc83d] border border-[rgba(255,200,61,0.4)] font-extrabold animate-gold-pulse">
              VIP
            </span>
          </div>
          <div className="text-[11px] text-[#94a3b8] font-mono">SELECT WINGO MODE</div>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {MODES.map((item) => (
          <div
            key={item.mode}
            className="cyber-card p-4 border-[rgba(255,200,61,0.22)] bg-gradient-to-br from-[rgba(16,10,36,0.95)] to-[rgba(28,16,56,0.7)]"
          >
            <div className="text-xs font-black text-white mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="tracking-wide">{item.name}</span>
              </div>
              <span className="font-mono text-[10px] font-extrabold text-[#ffc83d] bg-[rgba(255,200,61,0.12)] border border-[rgba(255,200,61,0.3)] px-2 py-0.5 rounded-md shadow-[0_0_8px_rgba(255,200,61,0.2)]">
                {item.badge}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div
                className="bg-[rgba(11,7,24,0.85)] border border-[rgba(255,200,61,0.2)] rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ffc83d] hover:shadow-[0_0_14px_rgba(255,200,61,0.25)] active:scale-95"
                onClick={() => onSelectModeMarket(item.mode, 'big-small')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,200,61,0.12)] border border-[rgba(255,200,61,0.25)] flex items-center justify-center text-base">
                    🔢
                  </div>
                  <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[rgba(0,229,168,0.12)] border border-[rgba(0,229,168,0.3)]">
                    <span className="text-[#00E5A8]">B</span>
                    <span className="text-white/40 mx-0.5">/</span>
                    <span className="text-[#B45CFF]">S</span>
                  </span>
                </div>
                <div className="text-[12px] font-bold text-white">
                  <span className="text-[#00E5A8]">Big</span> &amp; <span className="text-[#B45CFF]">Small</span>
                </div>
                <div className="text-[10px] mt-1.5 flex items-center gap-1 text-[#ffc83d] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffc83d] shadow-[0_0_6px_#ffc83d] animate-live-dot" />
                  <span>PRO VIP</span>
                </div>
              </div>

              <div
                className="bg-[rgba(11,7,24,0.85)] border border-[rgba(255,200,61,0.2)] rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ffc83d] hover:shadow-[0_0_14px_rgba(255,200,61,0.25)] active:scale-95"
                onClick={() => onSelectModeMarket(item.mode, 'red-green')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,200,61,0.12)] border border-[rgba(255,200,61,0.25)] flex items-center justify-center text-base">
                    🎨
                  </div>
                  <span className="font-mono text-[10px] font-extrabold text-[#ffc83d] bg-[rgba(255,200,61,0.15)] px-1.5 py-0.5 rounded">
                    R/G
                  </span>
                </div>
                <div className="text-[12px] font-bold text-white">Red & Green</div>
                <div className="text-[10px] mt-1.5 flex items-center gap-1 text-[#ffc83d] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffc83d] shadow-[0_0_6px_#ffc83d] animate-live-dot" />
                  <span>PRO VIP</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
