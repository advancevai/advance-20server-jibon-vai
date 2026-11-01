import React from 'react';
import { EngineState, GameMode, MarketType } from '../types';
import { ENGINE_EMOJIS, ENGINE_NAMES, GAME_CONFIGS, GRADIENT_CLASSES } from '../constants/games';

interface ServerGridViewProps {
  mode: GameMode;
  market: MarketType;
  engines: EngineState[];
  onBack: () => void;
  onSelectRule: (engineId: number) => void;
  time: string;
}

const MARKET_LABELS: Record<MarketType, string> = {
  'big-small': 'Big/Small',
  'red-green': 'Red/Green',
  'even-odd': 'Even/Odd',
};

const getRankClass = (rank: number) => {
  if (rank === 0)
    return 'bg-[rgba(255,200,61,0.18)] text-[#ffc83d] border-[rgba(255,200,61,0.4)] shadow-[0_0_10px_rgba(255,200,61,0.25)]';
  if (rank === 1)
    return 'bg-[rgba(192,192,192,0.14)] text-[#e2e8f0] border-[rgba(192,192,192,0.3)]';
  if (rank === 2)
    return 'bg-[rgba(205,127,50,0.14)] text-[#f59e0b] border-[rgba(205,127,50,0.3)]';
  return '';
};

const getRankText = (rank: number) => {
  if (rank === 0) return '🏆 TOP 1ST';
  if (rank === 1) return '🥈 2ND';
  if (rank === 2) return '🥉 3RD';
  return '';
};

export const ServerGridView: React.FC<ServerGridViewProps> = ({
  mode,
  market,
  engines,
  onBack,
  onSelectRule,
  time,
}) => {
  const config = GAME_CONFIGS[mode];

  // Rank engines by last 10 accuracy
  const sorted = [...engines]
    .map((e, idx) => {
      const recent = e.history.slice(0, 10);
      const wins = recent.filter((x) => x.status === 'WIN').length;
      const total = recent.length;
      const rate = total > 0 ? wins / total : 0;
      return {
        ...e,
        originalIndex: idx,
        last10Rate: rate,
        last10Wins: wins,
        last10Total: total,
      };
    })
    .sort((a, b) => b.last10Rate - a.last10Rate || b.last10Wins - a.last10Wins);

  const totalWins = engines.reduce((acc, curr) => acc + curr.wins, 0);
  const totalGames = engines.reduce((acc, curr) => acc + curr.wins + curr.losses, 0);
  const overallRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

  return (
    <div className="animate-fade-up">
      {/* Top Navbar */}
      <div className="flex items-center gap-3 px-1 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl border border-[rgba(160,32,240,0.3)] bg-[#0B0718] flex items-center justify-center cursor-pointer text-white text-base transition-all hover:border-[#00b7ff] hover:shadow-[0_0_12px_rgba(0,183,255,0.3)] active:scale-95"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="text-[17px] font-extrabold text-white">{config.label}</div>
          <div className="font-mono text-[11px] text-[#94a3b8]">
            {time} · {MARKET_LABELS[market]}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-[#64748b] uppercase tracking-wider font-mono">
            {config.gameType.toUpperCase()} · {config.badge}
          </div>
          <div className="text-base font-extrabold font-mono text-[#00ffa3] drop-shadow-[0_0_8px_rgba(0,255,163,0.35)]">
            {overallRate}%
          </div>
          <div
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-md mt-0.5 inline-block border font-mono"
            style={{
              background:
                market === 'red-green'
                  ? 'rgba(255, 43, 94, 0.15)'
                  : market === 'even-odd'
                  ? 'rgba(0, 255, 163, 0.15)'
                  : 'linear-gradient(90deg, rgba(0, 229, 168, 0.18), rgba(180, 92, 255, 0.18))',
              color:
                market === 'red-green'
                  ? '#ff2b5e'
                  : market === 'even-odd'
                  ? '#00ffa3'
                  : '#00E5A8',
              borderColor:
                market === 'red-green'
                  ? 'rgba(255, 43, 94, 0.35)'
                  : market === 'even-odd'
                  ? 'rgba(0, 255, 163, 0.35)'
                  : 'rgba(0, 229, 168, 0.45)',
            }}
          >
            {market === 'big-small' ? (
              <span>
                <span className="text-[#00E5A8]">Big</span>
                <span className="text-white/40 mx-0.5">/</span>
                <span className="text-[#B45CFF]">Small</span>
              </span>
            ) : (
              MARKET_LABELS[market]
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-2 mb-3 rounded-xl bg-[rgba(11,7,24,0.6)] border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-1.5 text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-live-dot" />
          <span className="text-[#00ffa3] tracking-wider font-mono">AI ENGINES ONLINE</span>
        </div>
        <div className="text-[11px] text-[#94a3b8] font-mono">{engines.length} Servers Active</div>
      </div>

      {/* 2-Column Responsive Server Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {sorted.map((engine, rankIdx) => {
          const winRate =
            engine.last10Total > 0 ? Math.round(engine.last10Rate * 100) : 0;
          const origIdx = engine.originalIndex;
          const isTop3 = rankIdx < 3;
          const borderClass =
            rankIdx === 0
              ? 'anim-border-gold'
              : isTop3
              ? 'anim-border-neon'
              : 'border border-[rgba(160,32,240,0.22)] bg-[rgba(16,10,36,0.85)]';

          return (
            <div
              key={engine.id}
              className={`rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1 active:scale-95 ${borderClass}`}
              onClick={() => onSelectRule(engine.id)}
            >
              <div className="anim-border-inner p-3 flex items-center gap-2.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-[rgba(255,255,255,0.12)] ${
                    GRADIENT_CLASSES[origIdx % GRADIENT_CLASSES.length]
                  } shadow-[0_2px_8px_rgba(0,0,0,0.4)]`}
                >
                  <span className="animate-float-gentle">{ENGINE_EMOJIS[origIdx]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-extrabold flex items-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis text-white">
                    <span>{ENGINE_NAMES[origIdx]}</span>
                    {isTop3 && (
                      <span
                        className={`text-[7px] px-1.5 py-0.5 rounded font-extrabold whitespace-nowrap border ${getRankClass(
                          rankIdx
                        )}`}
                      >
                        {getRankText(rankIdx)}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#94a3b8] font-mono mt-0.5 flex items-center gap-1">
                    <span>S#{engine.id}</span>
                    <span className="text-[#00ffa3] font-bold">{winRate}%</span>
                  </div>
                </div>

                <div className="text-[#64748b] text-sm flex-shrink-0 font-bold">›</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
