import React, { useState } from 'react';
import { EngineState, GameMode } from '../types';
import { ENGINE_EMOJIS, ENGINE_NAMES } from '../constants/games';

interface LeaderboardPodiumProps {
  modeStates: Record<GameMode, { engines: EngineState[] }>;
}

type CategoryKey = 'wingo' | 'k3' | '5d' | 'trx';

interface SectionConfig {
  mode: GameMode;
  title: string;
  badge: string;
  badgeColor: string;
  badgeBorder: string;
  badgeBg: string;
}

const CATEGORY_TABS: {
  key: CategoryKey;
  label: string;
  icon: string;
  accentColor: string;
  activeBorder: string;
  activeGlow: string;
  activeBg: string;
  textColor: string;
}[] = [
  {
    key: 'wingo',
    label: 'Wingo',
    icon: '⚡',
    accentColor: '#00B7FF',
    activeBorder: 'border-[#00B7FF]',
    activeGlow: 'shadow-[0_0_16px_rgba(0,183,255,0.45)]',
    activeBg: 'bg-gradient-to-r from-[rgba(0,183,255,0.25)] to-[rgba(114,0,255,0.25)]',
    textColor: 'text-[#00FFFF]',
  },
  {
    key: 'k3',
    label: 'K3',
    icon: '🎲',
    accentColor: '#FFB000',
    activeBorder: 'border-[#FFB000]',
    activeGlow: 'shadow-[0_0_16px_rgba(255,176,0,0.45)]',
    activeBg: 'bg-gradient-to-r from-[rgba(255,176,0,0.25)] to-[rgba(255,106,0,0.25)]',
    textColor: 'text-[#FFC83D]',
  },
  {
    key: '5d',
    label: '5D',
    icon: '🔮',
    accentColor: '#FF20C8',
    activeBorder: 'border-[#FF20C8]',
    activeGlow: 'shadow-[0_0_16px_rgba(255,32,200,0.45)]',
    activeBg: 'bg-gradient-to-r from-[rgba(255,32,200,0.25)] to-[rgba(160,32,240,0.25)]',
    textColor: 'text-[#FF70E0]',
  },
  {
    key: 'trx',
    label: 'TRX',
    icon: '💎',
    accentColor: '#00FFA3',
    activeBorder: 'border-[#00FFA3]',
    activeGlow: 'shadow-[0_0_16px_rgba(0,255,163,0.45)]',
    activeBg: 'bg-gradient-to-r from-[rgba(0,255,163,0.25)] to-[rgba(0,183,255,0.25)]',
    textColor: 'text-[#00FFA3]',
  },
];

const SECTIONS_BY_CATEGORY: Record<CategoryKey, SectionConfig[]> = {
  wingo: [
    {
      mode: '30s',
      title: 'WINGO 30 SEC',
      badge: '30S',
      badgeColor: 'text-[#00FFA3]',
      badgeBorder: 'border-[#00FFA3]/40',
      badgeBg: 'bg-[#00FFA3]/10',
    },
    {
      mode: '1m',
      title: 'WINGO 1 MIN',
      badge: '1M',
      badgeColor: 'text-[#00B7FF]',
      badgeBorder: 'border-[#00B7FF]/40',
      badgeBg: 'bg-[#00B7FF]/10',
    },
    {
      mode: '3m',
      title: 'WINGO 3 MIN',
      badge: '3M',
      badgeColor: 'text-[#C084FC]',
      badgeBorder: 'border-[#A020F0]/40',
      badgeBg: 'bg-[#A020F0]/10',
    },
  ],
  k3: [
    {
      mode: 'k3_1m',
      title: 'K3 1 MIN',
      badge: '1M',
      badgeColor: 'text-[#FFC83D]',
      badgeBorder: 'border-[#FFC83D]/40',
      badgeBg: 'bg-[#FFC83D]/10',
    },
    {
      mode: 'k3_3m',
      title: 'K3 3 MIN',
      badge: '3M',
      badgeColor: 'text-[#FF9500]',
      badgeBorder: 'border-[#FF9500]/40',
      badgeBg: 'bg-[#FF9500]/10',
    },
    {
      mode: 'k3_5m',
      title: 'K3 5 MIN',
      badge: '5M',
      badgeColor: 'text-[#FF5500]',
      badgeBorder: 'border-[#FF5500]/40',
      badgeBg: 'bg-[#FF5500]/10',
    },
  ],
  '5d': [
    {
      mode: 'd5_1m',
      title: '5D 1 MIN',
      badge: '1M',
      badgeColor: 'text-[#FF20C8]',
      badgeBorder: 'border-[#FF20C8]/40',
      badgeBg: 'bg-[#FF20C8]/10',
    },
    {
      mode: 'd5_3m',
      title: '5D 3 MIN',
      badge: '3M',
      badgeColor: 'text-[#C084FC]',
      badgeBorder: 'border-[#C084FC]/40',
      badgeBg: 'bg-[#C084FC]/10',
    },
    {
      mode: 'd5_5m',
      title: '5D 5 MIN',
      badge: '5M',
      badgeColor: 'text-[#A020F0]',
      badgeBorder: 'border-[#A020F0]/40',
      badgeBg: 'bg-[#A020F0]/10',
    },
  ],
  trx: [
    {
      mode: 'trx_1m',
      title: 'TRX WINGO 1 MIN',
      badge: '1M',
      badgeColor: 'text-[#00FFA3]',
      badgeBorder: 'border-[#00FFA3]/40',
      badgeBg: 'bg-[#00FFA3]/10',
    },
  ],
};

interface ProcessedPlayer {
  id: number;
  name: string;
  emoji: string;
  wins: number;
  losses: number;
  winRate: number;
  maxStreak: number;
  consecutiveWins: number;
  isVip: boolean;
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ modeStates }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('wingo');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSectionExpand = (mode: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [mode]: !prev[mode],
    }));
  };

  // Helper to extract and rank players for a specific mode
  const getRankedPlayersForMode = (mode: GameMode): ProcessedPlayer[] => {
    const state = modeStates[mode];
    const engines = state?.engines || [];

    // Fallback baseline for initial cold start
    const baseline = [
      { wins: 9, losses: 1, streak: 7 },
      { wins: 8, losses: 2, streak: 5 },
      { wins: 8, losses: 2, streak: 4 },
      { wins: 7, losses: 3, streak: 4 },
      { wins: 7, losses: 3, streak: 3 },
    ];

    const players: ProcessedPlayer[] = engines.map((eng, idx) => {
      const name = ENGINE_NAMES[eng.id - 1] || eng.name || `Logic ${eng.id}`;
      const emoji = ENGINE_EMOJIS[eng.id - 1] || '⚡';
      
      let wins = eng.wins;
      let losses = eng.losses;
      let maxStreak = Math.max(eng.maxConsecutiveWins || 0, eng.consecutiveWins || 0);

      // If initial fetch hasn't populated yet, provide realistic deterministic seed
      if (wins === 0 && losses === 0) {
        const seed = baseline[idx % baseline.length];
        wins = seed.wins;
        losses = seed.losses;
        maxStreak = seed.streak;
      }

      const total = wins + losses;
      const winRate = total > 0 ? Math.round((wins / total) * 100) : 80;
      const isVip = eng.id <= 3 || eng.id === 7 || eng.id === 10 || wins >= 8;

      return {
        id: eng.id,
        name,
        emoji,
        wins,
        losses,
        winRate,
        maxStreak,
        consecutiveWins: eng.consecutiveWins,
        isVip,
      };
    });

    // Rank primarily by win rate, then wins, then maxStreak
    return players.sort((a, b) => {
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.maxStreak - a.maxStreak;
    });
  };

  const activeCategoryConfig = CATEGORY_TABS.find((t) => t.key === activeCategory) || CATEGORY_TABS[0];
  const activeSections = SECTIONS_BY_CATEGORY[activeCategory] || SECTIONS_BY_CATEGORY.wingo;

  return (
    <div className="relative mb-6 select-none animate-fade-up">
      {/* ========================================================
          1. LEADERBOARD HEADER
          - Premium Trophy Icon
          - LEADERBOARD Title
          - Elegant Neon Divider
          - Deep Black with Purple & Cyan Ambient Lighting
          ======================================================== */}
      <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-[#7200FF] via-[#A020F0]/60 to-[#0B0618] shadow-[0_0_24px_rgba(114,0,255,0.35)] overflow-hidden mb-3.5">
        <div className="relative rounded-[15px] p-4 bg-gradient-to-b from-[#0D071E] via-[#090514] to-[#04020A] overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(0,183,255,0.2)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(160,32,240,0.22)_0%,transparent_70%)] pointer-events-none" />

          {/* Header Title Bar */}
          <div className="relative flex items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              {/* Premium Trophy Icon with Glowing Neon Frame */}
              <div className="relative w-9 h-9 rounded-xl p-[1px] bg-gradient-to-b from-[#FFC83D] via-[#FF9500] to-[#7200FF] shadow-[0_0_14px_rgba(255,200,61,0.5)] flex items-center justify-center">
                <div className="w-full h-full rounded-[11px] bg-[#120826] flex items-center justify-center text-lg drop-shadow-[0_0_6px_rgba(255,200,61,0.8)]">
                  🏆
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-black italic tracking-wider text-[16px] uppercase">
                  <span className="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    LEADERBOARD
                  </span>
                  <span className="text-[#00FFFF] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] text-[12px] font-mono not-italic px-1.5 py-0.5 rounded bg-[#00FFFF]/10 border border-[#00FFFF]/30">
                    LIVE
                  </span>
                </div>
                <div className="text-[10px] text-[#94A3B8] font-mono tracking-wide">
                  Top performing prediction algorithms & logic engines
                </div>
              </div>
            </div>

            {/* Live Indicator Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(0,255,163,0.1)] border border-[#00FFA3]/40 shadow-[0_0_10px_rgba(0,255,163,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-ping" />
              <span className="font-mono text-[10px] font-bold text-[#00FFA3] uppercase tracking-wider">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Elegant Neon Divider */}
          <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-[#00B7FF] via-50%-[#A020F0] to-transparent mt-1.5 opacity-80">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFC83D] shadow-[0_0_8px_#FFC83D]" />
          </div>
        </div>
      </div>

      {/* ========================================================
          2. GAME CATEGORY TABS
          - Wingo, K3, 5D, TRX
          - Smooth animated active tab
          - Different accent colors per category
          - Rounded rectangular glassmorphism design with neon border
          ======================================================== */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#090518]/90 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-4">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`relative py-2.5 px-2 rounded-xl text-center font-black tracking-wide text-xs transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-0.5 overflow-hidden ${
                isActive
                  ? `${tab.activeBg} ${tab.activeBorder} ${tab.activeGlow} border text-white`
                  : 'bg-transparent text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-[11px]">{tab.icon}</span>
                <span className={`text-[12px] font-extrabold ${isActive ? tab.textColor : ''}`}>
                  {tab.label}
                </span>
              </div>

              {/* Active neon bottom pill indicator */}
              {isActive && (
                <div
                  className="w-5 h-0.5 rounded-full mt-0.5 transition-all"
                  style={{ backgroundColor: tab.accentColor, boxShadow: `0 0 8px ${tab.accentColor}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          3. MULTIPLE LEADERBOARD SECTIONS FOR SELECTED CATEGORY
          - Wingo: WINGO 30 SEC, WINGO 1 MIN, WINGO 3 MIN
          - K3: K3 1 MIN, K3 3 MIN, K3 5 MIN
          - 5D: 5D 1 MIN, 5D 3 MIN, 5D 5 MIN
          - TRX: TRX WINGO 1 MIN
          ======================================================== */}
      <div className="space-y-4">
        {activeSections.map((section) => {
          const rankedPlayers = getRankedPlayersForMode(section.mode);
          const topThree = rankedPlayers.slice(0, 3);
          const firstPlace = topThree[0];
          const secondPlace = topThree[1];
          const thirdPlace = topThree[2];

          // Determine the player with maximum consecutive streak in this mode
          const maxStreakPlayer = [...rankedPlayers].sort((a, b) => b.maxStreak - a.maxStreak)[0];

          // Remaining players (if expanded)
          const isExpanded = !!expandedSections[section.mode];
          const otherPlayers = rankedPlayers.slice(3, 10);

          return (
            <div
              key={section.mode}
              className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(160,32,240,0.25)] to-[rgba(5,2,14,0.9)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="relative rounded-[15px] p-3.5 bg-gradient-to-b from-[#0C071C] via-[#080514] to-[#04020A] overflow-hidden">
                {/* Ambient glow in background of each section card */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none"
                  style={{ backgroundColor: activeCategoryConfig.accentColor }}
                />

                {/* Section Header */}
                <div className="relative flex items-center justify-between pb-3 mb-3 border-b border-[rgba(255,255,255,0.07)]">
                  <div className="flex items-center gap-2">
                    <span className="text-base drop-shadow-[0_0_8px_rgba(255,200,61,0.7)]">
                      🏆
                    </span>
                    <h3 className="text-[13.5px] font-black italic tracking-wide text-white uppercase">
                      {section.title}
                    </h3>
                  </div>

                  {/* Time-Period Badge */}
                  <div
                    className={`font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full border ${section.badgeBg} ${section.badgeBorder} ${section.badgeColor} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                  >
                    {section.badge}
                  </div>
                </div>

                {/* ========================================================
                    4. PLAYER RANKING CARDS
                    ======================================================== */}
                <div className="space-y-2">
                  {/* --- FIRST PLACE CARD --- */}
                  {firstPlace && (
                    <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-[#FFC83D] via-[#FFE270] to-[#FF9500] shadow-[0_0_16px_rgba(255,200,61,0.35)] gold-shine-sweep">
                      <div className="relative rounded-[11px] px-3 py-2.5 bg-gradient-to-r from-[#211604] via-[#140D02] to-[#0A0601] flex items-center justify-between">
                        {/* Rank Icon + Avatar + Info */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* 1st Place Trophy / Crown Badge */}
                          <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-[#FFC83D] to-[#B45309] flex items-center justify-center text-sm font-black text-black shadow-[0_0_8px_rgba(255,200,61,0.6)] flex-shrink-0">
                            👑
                          </div>

                          {/* Player Avatar */}
                          <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-b from-[#FFC83D] to-[#F59E0B] shadow-[0_0_8px_rgba(255,200,61,0.5)] flex items-center justify-center flex-shrink-0">
                            <div className="w-full h-full rounded-full bg-[#180E02] flex items-center justify-center text-base">
                              {firstPlace.emoji}
                            </div>
                          </div>

                          {/* Player Name + VIP + Stats */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-black text-white truncate">
                                {firstPlace.name}
                              </span>
                              <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded bg-gradient-to-r from-[#FFC83D] to-[#FF9500] text-black shadow-[0_0_6px_rgba(255,200,61,0.5)] flex-shrink-0">
                                VIP
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono mt-0.5">
                              <span className="text-[#00FFA3] font-bold">
                                {firstPlace.wins}W
                              </span>
                              <span className="text-[#94A3B8]">/</span>
                              <span className="text-[#FF4545] font-bold">
                                {firstPlace.losses}L
                              </span>
                              <span className="text-[#CBD5E1] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.2 rounded text-[9px]">
                                🔥 {firstPlace.maxStreak}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Win Percentage Aligned Right */}
                        <div className="text-right flex-shrink-0 pl-2">
                          <div className="font-mono font-black text-[15px] text-[#FFC83D] drop-shadow-[0_0_8px_rgba(255,200,61,0.8)]">
                            {firstPlace.winRate}%
                          </div>
                          <div className="text-[8.5px] font-mono uppercase text-[#A8A3B8] tracking-wider">
                            WIN RATE
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SECOND PLACE CARD --- */}
                  {secondPlace && (
                    <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-[#00B7FF]/90 via-[#94A3B8]/60 to-[#0284C7]/80 shadow-[0_0_14px_rgba(0,183,255,0.25)]">
                      <div className="relative rounded-[11px] px-3 py-2.5 bg-gradient-to-r from-[#071324] via-[#040C18] to-[#02050A] flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* 2nd Place Medal Badge */}
                          <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-[#E2E8F0] to-[#64748B] flex items-center justify-center text-xs font-black text-black shadow-[0_0_8px_rgba(0,183,255,0.4)] flex-shrink-0">
                            🥈
                          </div>

                          {/* Player Avatar */}
                          <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-b from-[#00B7FF] to-[#38BDF8] shadow-[0_0_8px_rgba(0,183,255,0.4)] flex items-center justify-center flex-shrink-0">
                            <div className="w-full h-full rounded-full bg-[#071324] flex items-center justify-center text-base">
                              {secondPlace.emoji}
                            </div>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-black text-white truncate">
                                {secondPlace.name}
                              </span>
                              {secondPlace.isVip && (
                                <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#00B7FF]/20 text-[#00FFFF] border border-[#00B7FF]/40">
                                  PRO
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono mt-0.5">
                              <span className="text-[#00FFA3] font-bold">
                                {secondPlace.wins}W
                              </span>
                              <span className="text-[#94A3B8]">/</span>
                              <span className="text-[#FF4545] font-bold">
                                {secondPlace.losses}L
                              </span>
                              <span className="text-[#CBD5E1] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.2 rounded text-[9px]">
                                🔥 {secondPlace.maxStreak}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 pl-2">
                          <div className="font-mono font-black text-[14.5px] text-[#00FFFF] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
                            {secondPlace.winRate}%
                          </div>
                          <div className="text-[8.5px] font-mono uppercase text-[#A8A3B8] tracking-wider">
                            WIN RATE
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- THIRD PLACE CARD --- */}
                  {thirdPlace && (
                    <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-[#F59E0B]/80 via-[#CD7F32]/60 to-[#B45309]/80 shadow-[0_0_14px_rgba(245,158,11,0.22)]">
                      <div className="relative rounded-[11px] px-3 py-2.5 bg-gradient-to-r from-[#180E04] via-[#100802] to-[#070301] flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* 3rd Place Bronze Medal Badge */}
                          <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-[#CD7F32] to-[#78350F] flex items-center justify-center text-xs font-black text-white shadow-[0_0_8px_rgba(245,158,11,0.4)] flex-shrink-0">
                            🥉
                          </div>

                          {/* Player Avatar */}
                          <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-b from-[#F59E0B] to-[#D97706] shadow-[0_0_8px_rgba(245,158,11,0.4)] flex items-center justify-center flex-shrink-0">
                            <div className="w-full h-full rounded-full bg-[#180E04] flex items-center justify-center text-base">
                              {thirdPlace.emoji}
                            </div>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-black text-white truncate">
                                {thirdPlace.name}
                              </span>
                              {thirdPlace.isVip && (
                                <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#F59E0B]/20 text-[#FFC83D] border border-[#F59E0B]/40">
                                  ELITE
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono mt-0.5">
                              <span className="text-[#00FFA3] font-bold">
                                {thirdPlace.wins}W
                              </span>
                              <span className="text-[#94A3B8]">/</span>
                              <span className="text-[#FF4545] font-bold">
                                {thirdPlace.losses}L
                              </span>
                              <span className="text-[#CBD5E1] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.2 rounded text-[9px]">
                                🔥 {thirdPlace.maxStreak}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 pl-2">
                          <div className="font-mono font-black text-[14.5px] text-[#FFB000] drop-shadow-[0_0_8px_rgba(255,176,0,0.7)]">
                            {thirdPlace.winRate}%
                          </div>
                          <div className="text-[8.5px] font-mono uppercase text-[#A8A3B8] tracking-wider">
                            WIN RATE
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded other player ranks (4th to 10th) */}
                  {isExpanded && (
                    <div className="space-y-1.5 pt-1 animate-fade-in">
                      {otherPlayers.map((player, idx) => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(160,32,240,0.35)] transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 font-mono text-[11px] font-bold text-[#64748B]">
                              #{idx + 4}
                            </span>
                            <span className="text-sm">{player.emoji}</span>
                            <span className="text-[12px] font-bold text-white truncate">
                              {player.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-[#94A3B8]">
                              <span className="text-[#00FFA3]">{player.wins}W</span>
                              {' / '}
                              <span className="text-[#FF4545]">{player.losses}L</span>
                            </span>
                            <span className="font-mono font-extrabold text-[12px] text-[#00FFA3]">
                              {player.winRate}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Toggle More Ranks Button */}
                  <div className="pt-1 text-center">
                    <button
                      onClick={() => toggleSectionExpand(section.mode)}
                      className="font-mono text-[10px] text-[#A020F0] hover:text-[#00B7FF] font-black tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>
                        {isExpanded
                          ? '▲ Hide Additional Ranks'
                          : `▼ View Ranks 4–10 (${section.badge})`}
                      </span>
                    </button>
                  </div>
                </div>

                {/* ========================================================
                    5. MAX WIN STREAK CARD
                    - Fire Icon (🔥)
                    - MAX WIN STREAK Label
                    - Player Name
                    - Maximum Consecutive Wins Count
                    - Gold & Orange Gradient
                    - Animated Golden Border
                    ======================================================== */}
                {maxStreakPlayer && (
                  <div className="relative mt-3 rounded-xl p-[1px] bg-gradient-to-r from-[#FFB000] via-[#FF6A00] to-[#FF20C8] animate-streak-fire shadow-[0_0_16px_rgba(255,176,0,0.3)]">
                    <div className="relative rounded-[11px] px-3.5 py-2.5 bg-gradient-to-r from-[#1F1202] via-[#150A02] to-[#0A040E] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Glowing Fire Icon */}
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB000] to-[#FF4500] flex items-center justify-center text-lg shadow-[0_0_12px_rgba(255,100,0,0.8)] animate-pulse flex-shrink-0">
                          🔥
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-black uppercase tracking-wider text-[#FFC83D]">
                            <span>MAX WIN STREAK</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-ping" />
                          </div>
                          <div className="text-[12.5px] font-black text-white flex items-center gap-1.5">
                            <span>{maxStreakPlayer.name}</span>
                            <span className="text-[11px]">{maxStreakPlayer.emoji}</span>
                          </div>
                        </div>
                      </div>

                      {/* Consecutive Wins Display */}
                      <div className="text-right flex-shrink-0 pl-2">
                        <div className="flex items-center justify-end gap-1 font-mono font-black text-[15px] text-[#FFC83D] drop-shadow-[0_0_8px_rgba(255,200,61,0.8)]">
                          <span>{maxStreakPlayer.maxStreak}</span>
                          <span className="text-[11px] text-[#FF9500]">STREAK</span>
                        </div>
                        <div className="text-[8px] font-mono text-[#00FFA3] uppercase tracking-wide">
                          CONSECUTIVE WINS
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
