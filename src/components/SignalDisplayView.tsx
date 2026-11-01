import React, { useEffect, useState } from 'react';
import { DrawIssue, EngineState, GameMode, MarketType } from '../types';
import { ENGINE_NAMES, GAME_CONFIGS } from '../constants/games';
import { APP_CONFIG } from '../constants/config';

interface SignalDisplayViewProps {
  mode: GameMode;
  market: MarketType;
  engine?: EngineState;
  history: DrawIssue[];
  onBack: () => void;
  time: string;
}

const MARKET_LABELS: Record<MarketType, string> = {
  'big-small': 'BIG/SMALL',
  'red-green': 'RED/GREEN',
  'even-odd': 'EVEN/ODD',
};

function formatPeriodDisplay(p?: string): string {
  if (!p) return '---';
  return p.length > 8 ? '...' + p.slice(-6) : p;
}

export const SignalDisplayView: React.FC<SignalDisplayViewProps> = ({
  mode,
  market,
  engine,
  history,
  onBack,
  time,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const config = GAME_CONFIGS[mode];

  // Real-time second tick for countdown ring
  useEffect(() => {
    const updateCountdown = () => {
      const currentSeconds = Math.floor(Date.now() / 1000);
      const mod = config.timerMod;
      const left = mod - (currentSeconds % mod);
      setSecondsRemaining(left);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 250);
    return () => clearInterval(interval);
  }, [config.timerMod]);

  if (!engine) return null;

  const engineIdx = engine.id - 1;
  const pred = engine.currentPrediction;
  const confidence = pred?.confidence ?? 80;

  const recentHistory = engine.history.slice(0, 10);
  const wins = recentHistory.filter((x) => x.status === 'WIN').length;
  const total = recentHistory.length;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const losses = total - wins;

  // Next expected period
  let nextPeriod = '---';
  if (history.length > 0) {
    try {
      nextPeriod = (BigInt(history[0].period) + 1n).toString();
    } catch {
      nextPeriod = String(parseInt(history[0].period, 10) + 1);
    }
  }

  // SVG Circular countdown geometry
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, Math.min(1, secondsRemaining / config.timerMod));
  const offset = circumference - progressRatio * circumference;

  const getSignalBadgeClass = () => {
    if (!pred) return '';
    switch (pred.type) {
      case 'Big':
        return 'signal-big';
      case 'Small':
        return 'signal-small';
      case 'Even':
        return 'signal-even';
      case 'Odd':
        return 'signal-odd';
      case 'Red':
        return 'signal-red';
      case 'Green':
        return 'signal-green';
      default:
        return '';
    }
  };

  const formatValueBadge = (val: string) => {
    if (!val || val === '-') return <span className="text-[#94a3b8]">-</span>;
    const isBig = val.toUpperCase().includes('BIG');
    const isSmall = val.toUpperCase().includes('SMALL');
    if (isBig) {
      return (
        <span className="font-extrabold text-[#00E5A8] drop-shadow-[0_0_8px_rgba(0,229,168,0.6)]">
          {val}
        </span>
      );
    }
    if (isSmall) {
      return (
        <span className="font-extrabold text-[#B45CFF] drop-shadow-[0_0_8px_rgba(180,92,255,0.6)]">
          {val}
        </span>
      );
    }
    return <span className="text-white">{val}</span>;
  };

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
          <div className="text-base font-extrabold text-white flex items-center gap-2">
            <span>{ENGINE_NAMES[engineIdx]}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(114,0,255,0.2)] text-[#00b7ff] border border-[rgba(0,183,255,0.3)] font-mono">
              S#{engine.id}
            </span>
          </div>
          <div className="text-[11px] text-[#94a3b8] font-mono">{config.label}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-[#64748b] uppercase tracking-wider font-mono">
            {config.gameType.toUpperCase()} · {config.badge}
          </div>
          <div
            className="text-[10px] font-extrabold px-2 py-0.5 rounded-md mt-0.5 inline-block border font-mono"
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
                <span className="text-[#00E5A8]">BIG</span>
                <span className="text-white/40 mx-0.5">/</span>
                <span className="text-[#B45CFF]">SMALL</span>
              </span>
            ) : (
              MARKET_LABELS[market]
            )}
          </div>
        </div>
      </div>

      {/* 1. Period & Animated Circular Countdown Timer Card */}
      <div className="cyber-card p-4 mb-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-[10px] tracking-[2px] uppercase text-[#94a3b8] mb-1 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b7ff] shadow-[0_0_6px_#00b7ff] animate-live-dot" />
              CURRENT PERIOD
            </div>
            <div className="digital-readout text-[2rem] tracking-tight">
              {formatPeriodDisplay(nextPeriod)}
            </div>
            <div className="text-[11px] text-[#64748b] font-mono mt-0.5">
              Live Draw Sync Active
            </div>
          </div>

          {/* Animated Circular Progress Gauge */}
          <div className="relative inline-flex items-center justify-center w-[76px] h-[76px] flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-[76px] h-[76px] -rotate-90">
              <circle
                className="stroke-[rgba(114,0,255,0.18)]"
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke={secondsRemaining <= 5 ? '#ff2b5e' : '#00b7ff'}
                style={{
                  filter: `drop-shadow(0 0 6px ${secondsRemaining <= 5 ? '#ff2b5e' : '#00b7ff'})`,
                  transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s ease',
                }}
              />
            </svg>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[1.2rem] font-black text-white"
              style={{
                textShadow: `0 0 12px ${secondsRemaining <= 5 ? '#ff2b5e' : 'rgba(0,183,255,0.7)'}`,
              }}
            >
              {secondsRemaining}s
            </div>
            <span
              className={`absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full animate-live-dot ${
                secondsRemaining <= 5
                  ? 'bg-[#ff2b5e] shadow-[0_0_10px_#ff2b5e]'
                  : 'bg-[#00ffa3] shadow-[0_0_10px_#00ffa3]'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 2. Predicted Signal & Animated Confidence Gauge */}
      <div className="cyber-card p-4 mb-3.5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[10px] tracking-[2px] uppercase text-[#94a3b8] mb-1.5 font-mono font-bold flex items-center gap-1.5">
              <span>⚡ AI SIGNAL PREDICTION</span>
            </div>
            {pred ? (
              <div
                className={`inline-block px-7 py-3 rounded-2xl font-black text-2xl tracking-wider font-mono border-2 transition-all duration-300 ${getSignalBadgeClass()}`}
              >
                {pred.type.toUpperCase()} {pred.calcNumber}
              </div>
            ) : (
              <div className="inline-block px-6 py-3 rounded-2xl font-bold text-2xl tracking-wider font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] text-[#8899aa]">
                CALCULATING
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="text-[10px] tracking-[2px] uppercase text-[#94a3b8] mb-1 font-mono font-bold">
              CONFIDENCE
            </div>
            <div className="font-mono text-2xl font-black text-[#00ffa3] drop-shadow-[0_0_10px_rgba(0,255,163,0.4)]">
              {pred ? `${confidence}%` : '--'}
            </div>
            <div className="text-[10px] text-[#64748b] font-mono">Algorithm v4.2</div>
          </div>
        </div>

        {/* Animated Confidence Bar */}
        {pred && (
          <div className="w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7200ff] via-[#00b7ff] to-[#00ffa3] transition-all duration-500 shadow-[0_0_8px_#00ffa3]"
              style={{ width: `${confidence}%` }}
            />
          </div>
        )}
      </div>

      {/* 3. Accuracy Statistics Cards */}
      <div className="grid grid-cols-4 gap-2 mb-3.5">
        {[
          { label: 'ACCURACY', value: `${winRate}%`, color: 'text-[#00ffa3]' },
          { label: 'WINS', value: wins, color: 'text-[#00ffa3]' },
          { label: 'LOSSES', value: losses, color: 'text-[#ff2b5e]' },
          { label: 'TOTAL', value: total, color: 'text-white' },
        ].map((item) => (
          <div
            key={item.label}
            className="cyber-card p-2.5 flex flex-col gap-0.5 text-center"
          >
            <span className="text-[9px] uppercase text-[#94a3b8] tracking-wider font-mono font-bold">
              {item.label}
            </span>
            <span className={`font-mono text-lg font-black ${item.color}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* 4. Last 10 Periods Modern Table */}
      <div className="cyber-card overflow-hidden mb-4 p-0">
        <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between bg-[rgba(11,7,24,0.5)]">
          <span className="text-[10px] text-[#94a3b8] uppercase tracking-[2px] font-mono font-bold flex items-center gap-1.5">
            <span className="text-[#00ffa3]">📊</span>
            <span>LAST 10 PERIODS HISTORY</span>
          </span>
          <span className="font-mono text-[10px] text-[#64748b]">{time}</span>
        </div>

        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full border-collapse font-mono text-[0.72rem] min-w-[360px]">
            <thead>
              <tr className="bg-[rgba(11,7,24,0.85)] border-b border-[rgba(160,32,240,0.25)] text-[#94a3b8]">
                <th className="py-2.5 px-3 text-left font-extrabold uppercase tracking-wider text-[10px]">
                  Period
                </th>
                <th className="py-2.5 px-2 text-center font-extrabold uppercase tracking-wider text-[10px]">
                  Number
                </th>
                <th className="py-2.5 px-2 text-center font-extrabold uppercase tracking-wider text-[10px]">
                  Prediction
                </th>
                <th className="py-2.5 px-2 text-center font-extrabold uppercase tracking-wider text-[10px]">
                  Result
                </th>
                <th className="py-2.5 px-3 text-right font-extrabold uppercase tracking-wider text-[10px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Live Pending Prediction Row */}
              {pred && (
                <tr className="animate-shimmer-row border-b border-[rgba(255,200,61,0.2)]">
                  <td className="py-2.5 px-3 text-white font-bold">
                    {formatPeriodDisplay(nextPeriod)}
                  </td>
                  <td className="py-2.5 px-2 text-center text-[#94a3b8]">-</td>
                  <td className="py-2.5 px-2 text-center font-bold">
                    {formatValueBadge(`${pred.type} ${pred.calcNumber}`)}
                  </td>
                  <td className="py-2.5 px-2 text-center text-[#94a3b8]">-</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-md font-extrabold text-[10px] bg-[rgba(255,200,61,0.18)] text-[#ffc83d] border border-[rgba(255,200,61,0.4)] animate-gold-pulse shadow-[0_0_8px_rgba(255,200,61,0.3)]">
                      PENDING
                    </span>
                  </td>
                </tr>
              )}

              {/* Recent Results */}
              {recentHistory.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[rgba(255,255,255,0.02)] transition-colors border-b border-[rgba(255,255,255,0.04)]"
                >
                  <td className="py-2.5 px-3 text-white">
                    {formatPeriodDisplay(item.period)}
                  </td>
                  <td className="py-2.5 px-2 text-center font-bold text-[#00b7ff]">
                    {item.result}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    {formatValueBadge(item.prediction)}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    {formatValueBadge(item.actual)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md font-extrabold text-[10px] border ${
                        item.status === 'WIN'
                          ? 'bg-[rgba(0,255,163,0.15)] text-[#00ffa3] border-[rgba(0,255,163,0.4)] shadow-[0_0_8px_rgba(0,255,163,0.25)]'
                          : 'bg-[rgba(255,43,94,0.15)] text-[#ff2b5e] border-[rgba(255,43,94,0.4)] shadow-[0_0_8px_rgba(255,43,94,0.25)]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {recentHistory.length === 0 && !pred && (
                <tr>
                  <td colSpan={5} className="text-[#94a3b8] text-center py-6">
                    Waiting for real draw data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-[10px] text-[#64748b] font-mono tracking-widest uppercase my-3 animate-text-glow">
        2026 V1 © {APP_CONFIG.name} || HGNICE
      </div>
    </div>
  );
};
