import React from 'react';
import { EngineState } from '../types';
import { BADGE_COLORS, ENGINE_EMOJIS, ENGINE_NAMES } from '../constants/games';

interface LeaderboardCardProps {
  label: string;
  badge: string;
  topEngines: EngineState[];
  hotStreakEngine: EngineState | null;
}

const MEDALS = ['👑', '🥈', '🥉'];

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  label,
  badge,
  topEngines,
  hotStreakEngine,
}) => {
  const topOne = topEngines.length > 0 ? topEngines[0] : null;

  return (
    <div className="cyber-card p-4 mb-3.5 border-[rgba(160,32,240,0.25)]">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <span className="text-sm font-extrabold text-white tracking-wide">{label}</span>
        </div>
        <span
          className={`font-mono text-[10px] px-2.5 py-1 rounded-lg font-extrabold border ${
            BADGE_COLORS[badge] || BADGE_COLORS['30S']
          }`}
        >
          {badge}
        </span>
      </div>

      {/* Top 3 List */}
      <div className="space-y-2">
        {topEngines.slice(0, 3).map((engine, rank) => {
          const recent = (engine.history || []).slice(0, 10);
          const wins = recent.filter((x) => x.status === 'WIN').length;
          const losses = recent.length - wins;
          const total = recent.length;
          const winRate =
            typeof engine.winRate === 'number'
              ? Math.round(engine.winRate)
              : total > 0
              ? Math.round((wins / total) * 100)
              : 0;

          const isTop = topOne && engine.id === topOne.id;

          const medalStyles = [
            'bg-[rgba(255,200,61,0.15)] text-[#ffc83d] border-[rgba(255,200,61,0.35)] shadow-[0_0_12px_rgba(255,200,61,0.25)]',
            'bg-[rgba(192,192,192,0.12)] text-[#e2e8f0] border-[rgba(192,192,192,0.25)]',
            'bg-[rgba(205,127,50,0.12)] text-[#f59e0b] border-[rgba(205,127,50,0.25)]',
          ];

          return (
            <div
              key={engine.id}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                isTop
                  ? 'bg-[rgba(255,200,61,0.06)] border border-[rgba(255,200,61,0.28)] shadow-[0_0_16px_rgba(255,200,61,0.12)]'
                  : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]'
              }`}
            >
              {/* Medal / Rank Indicator */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border ${medalStyles[rank]}`}
              >
                {MEDALS[rank]}
              </div>

              <span className="text-base animate-float-gentle">{ENGINE_EMOJIS[engine.id - 1]}</span>

              {/* Engine Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-bold text-white truncate flex items-center gap-1.5">
                  <span>{ENGINE_NAMES[engine.id - 1]}</span>
                  {isTop && (
                    <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-md bg-[rgba(255,200,61,0.2)] text-[#ffc83d] border border-[rgba(255,200,61,0.4)] animate-gold-pulse">
                      TOP
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-[#94a3b8] font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#00ffa3] font-semibold">{wins}W</span>
                  <span className="opacity-30">·</span>
                  <span className="text-[#ff2b5e] font-semibold">{losses}L</span>
                  <span className="opacity-30">·</span>
                  <span className="text-[#00b7ff]">🔥 Max {engine.maxConsecutiveWins}</span>
                </div>
              </div>

              {/* Win Rate */}
              <div className="text-right">
                <span className="font-mono text-[14px] font-extrabold text-[#00ffa3] drop-shadow-[0_0_8px_rgba(0,255,163,0.3)]">
                  {winRate}%
                </span>
              </div>
            </div>
          );
        })}

        {/* Hot Streak Banner */}
        {hotStreakEngine && hotStreakEngine.consecutiveWins > 0 && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[rgba(255,200,61,0.08)] to-transparent border border-[rgba(255,200,61,0.25)]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-[rgba(255,200,61,0.18)] border border-[rgba(255,200,61,0.35)]">
              🔥
            </div>
            <span className="text-base">{ENGINE_EMOJIS[hotStreakEngine.id - 1]}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-extrabold text-[#ffc83d] uppercase tracking-wider">
                🔥 MAX WIN STREAK
              </div>
              <div className="text-[12px] font-bold text-white">
                {ENGINE_NAMES[hotStreakEngine.id - 1]}
              </div>
            </div>
            <span className="font-mono text-[12px] font-extrabold text-[#ffc83d] bg-[rgba(255,200,61,0.15)] border border-[rgba(255,200,61,0.35)] px-2.5 py-1 rounded-lg shadow-[0_0_10px_rgba(255,200,61,0.2)]">
              {hotStreakEngine.consecutiveWins} Wins
            </span>
          </div>
        )}

        {topEngines.length === 0 && (
          <div className="text-center text-xs text-[#94a3b8] py-4 font-mono">
            Loading data...
          </div>
        )}
      </div>
    </div>
  );
};
