/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  ALL_MODES,
  D5_SUB_CARDS,
  GAME_CONFIGS,
  K3_SUB_CARDS,
  TRX_SUB_CARDS,
  WINGO_SUB_CARDS,
} from './constants/games';
import { EngineState, GameMode, MarketType, ModeState, ViewState } from './types';
import { buildEnginesForMode } from './services/predictionEngine';
import { fetchDrawHistory, redeemPassword, verifyAccess } from './services/api';
import { Header } from './components/Header';
import { StatusBanner } from './components/StatusBanner';
import { SectionHeader } from './components/SectionHeader';
import { GameCard } from './components/GameCard';
import { D5SphereIcon, K3DiceIcon, TrxCrystalIcon, WingoGameIcon } from './components/GameIcons';
import { ProTradersCard } from './components/ProTradersCard';
import { LeaderboardPodium } from './components/LeaderboardPodium';
import { MarketChoiceView } from './components/MarketChoiceView';
import { ServerGridView } from './components/ServerGridView';
import { SignalDisplayView } from './components/SignalDisplayView';
import { LockScreen } from './components/LockScreen';
import { ProTradersView } from './components/ProTradersView';
import { APP_CONFIG } from './constants/config';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [lockReturnView, setLockReturnView] = useState<'home' | 'grid'>('grid');
  const [selectedMode, setSelectedMode] = useState<GameMode>('30s');
  const [selectedMarket, setSelectedMarket] = useState<MarketType>('big-small');
  const [selectedEngineId, setSelectedEngineId] = useState<number>(1);

  // Expandable sections on home screen
  const [wingoExpanded, setWingoExpanded] = useState<boolean>(false);
  const [k3Expanded, setK3Expanded] = useState<boolean>(false);
  const [d5Expanded, setD5Expanded] = useState<boolean>(false);
  const [trxExpanded, setTrxExpanded] = useState<boolean>(false);

  // Unlock Status
  const [isNormalUnlocked, setIsNormalUnlocked] = useState<boolean>(false);
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(false);

  // Live Time & Connection
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Mode States (history & engines)
  const [modeStates, setModeStates] = useState<Record<GameMode, ModeState>>(() => {
    const initial: Partial<Record<GameMode, ModeState>> = {};
    ALL_MODES.forEach((m) => {
      initial[m] = {
        engines: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `Logic ${i + 1}`,
          wins: 0,
          losses: 0,
          currentPrediction: null,
          history: [],
          consecutiveWins: 0,
          maxConsecutiveWins: 0,
        })),
        history: [],
        lastProcessedPeriod: null,
        accumulatedHistory: [],
      };
    });
    return initial as Record<GameMode, ModeState>;
  });

  // Check access authorization status
  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      const normal = await verifyAccess('normal');
      const pro = await verifyAccess('pro');
      if (isMounted) {
        setIsNormalUnlocked(normal);
        setIsProUnlocked(pro);
      }
    };
    checkAuth();
    const interval = setInterval(checkAuth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Clock ticker & online connection listeners
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Periodic draw fetcher
  const updateModeData = useCallback(async (mode: GameMode) => {
    const issues = await fetchDrawHistory(mode);
    if (!issues.length) return;
    setIsOnline(true);

    const config = GAME_CONFIGS[mode];

    setModeStates((prev) => {
      const current = prev[mode];
      const existingPeriods = new Set(current.accumulatedHistory.map((x) => x.period));
      const fresh = issues.filter((x) => !existingPeriods.has(x.period));

      let updatedAccum = [...current.accumulatedHistory];
      if (fresh.length > 0) {
        updatedAccum = [...fresh, ...updatedAccum]
          .sort((a, b) => {
            try {
              return BigInt(b.period) > BigInt(a.period)
                ? 1
                : BigInt(b.period) < BigInt(a.period)
                ? -1
                : 0;
            } catch {
              return parseInt(b.period, 10) - parseInt(a.period, 10);
            }
          })
          .slice(0, 50);
      }

      const engines = buildEnginesForMode(issues, updatedAccum, config.market);

      return {
        ...prev,
        [mode]: {
          engines,
          history: [...issues],
          lastProcessedPeriod: issues[0]?.period || null,
          accumulatedHistory: updatedAccum,
        },
      };
    });
  }, []);

  useEffect(() => {
    // Initial fetch for all modes
    ALL_MODES.forEach((m) => updateModeData(m));

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      ALL_MODES.forEach((m) => updateModeData(m));
    }, 5000);

    return () => clearInterval(interval);
  }, [updateModeData]);

  // Navigate to Mode & Market selection
  const handleOpenGrid = (mode: GameMode) => {
    setSelectedMode(mode);
    const config = GAME_CONFIGS[mode];
    if (config.gameType === 'wingo' || config.gameType === 'trx') {
      setCurrentView('marketChoice');
    } else {
      setSelectedMarket(config.market);
      setCurrentView('grid');
    }
  };

  const handleSelectMarket = (market: MarketType) => {
    setSelectedMarket(market);
    setCurrentView('grid');
  };

  const handleSelectRule = (engineId: number) => {
    setSelectedEngineId(engineId);
    if (!isNormalUnlocked && !isProUnlocked) {
      setLockReturnView('grid');
      setCurrentView('locked');
    } else {
      setCurrentView('prediction');
    }
  };

  const handleUnlockNormal = async (password: string) => {
    const success = await redeemPassword('normal', password);
    if (success) {
      setIsNormalUnlocked(true);
      setCurrentView(lockReturnView === 'home' ? 'home' : 'prediction');
      return true;
    }
    return false;
  };

  const handleUnlockPro = async (password: string) => {
    const success = await redeemPassword('pro', password);
    if (success) {
      setIsProUnlocked(true);
      setCurrentView('proModes');
      return true;
    }
    return false;
  };

  const handleProTraderClick = () => {
    if (isProUnlocked) {
      setCurrentView('proModes');
    } else {
      setCurrentView('proLocked');
    }
  };

  const handleProModeMarketSelect = (mode: GameMode, market: MarketType) => {
    setSelectedMode(mode);
    setSelectedMarket(market);
    setCurrentView('grid');
  };

  // Get engines for currently selected market
  const currentModeState = modeStates[selectedMode];
  const activeEngines = buildEnginesForMode(
    currentModeState.history,
    currentModeState.accumulatedHistory,
    selectedMarket
  );

  const timeString = currentTime.toLocaleTimeString();

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-[#7200FF] selection:text-white bg-[#02030A]">
      {/* 1. Multicolor Aurora Black Animated Background */}
      <div className="aurora-bg">
        <div className="aurora-grid" />
        <div className="aurora-wave aurora-wave-1" />
        <div className="aurora-wave aurora-wave-2" />
        <div className="aurora-wave aurora-wave-3" />
        <div className="aurora-wave aurora-wave-4" />
        <div className="aurora-wave aurora-wave-5" />

        {/* Floating Neon Aurora Particles */}
        <div className="aurora-particle w-1.5 h-1.5 bg-[#00B7FF] shadow-[0_0_8px_#00B7FF] left-[15%] [animation-delay:1s] [animation-duration:14s]" />
        <div className="aurora-particle w-2 h-2 bg-[#FF20C8] shadow-[0_0_10px_#FF20C8] left-[75%] [animation-delay:3s] [animation-duration:16s]" />
        <div className="aurora-particle w-1 h-1 bg-[#00FFA3] shadow-[0_0_6px_#00FFA3] left-[45%] [animation-delay:5s] [animation-duration:12s]" />
        <div className="aurora-particle w-2 h-2 bg-[#FFC83D] shadow-[0_0_10px_#FFC83D] left-[85%] [animation-delay:7s] [animation-duration:18s]" />
        <div className="aurora-particle w-1.5 h-1.5 bg-[#A020F0] shadow-[0_0_8px_#A020F0] left-[25%] [animation-delay:9s] [animation-duration:15s]" />
      </div>

      {/* Main Content Container (Mobile Optimized, Max 440px) */}
      <main className="max-w-[440px] mx-auto relative z-[1] px-3.5 pb-8 min-h-screen">
        {/* 1. HOME VIEW */}
        {currentView === 'home' && (
          <div className="animate-fade-up">
            {/* Header matching screenshot */}
            <Header />

            {/* Online Status Banner */}
            <StatusBanner isOnline={isOnline} currentTime={currentTime} />

            {/* Prediction Games Section Header */}
            <SectionHeader
              icon="🎮"
              titlePrimary="PREDICTION"
              titleSecondary="GAMES"
            />

            {/* 1. Wingo Card - Blue/Purple Neon Border */}
            <GameCard
              title="Wingo"
              subtitle="Color prediction · Big/Small · Red/Green"
              icon={<WingoGameIcon size={44} />}
              accentType="wingo"
              expanded={wingoExpanded}
              setExpanded={setWingoExpanded}
              subCards={WINGO_SUB_CARDS}
              openGrid={handleOpenGrid}
              modeCount={4}
            />

            {/* 2. K3 Card - Gold/Orange Neon Border */}
            <GameCard
              title="K3"
              subtitle="Dice prediction · Even/Odd · 4 modes"
              icon={<K3DiceIcon size={44} />}
              accentType="k3"
              expanded={k3Expanded}
              setExpanded={setK3Expanded}
              subCards={K3_SUB_CARDS}
              openGrid={handleOpenGrid}
              modeCount={4}
            />

            {/* 3. 5D Card - Purple/Magenta Neon Border */}
            <GameCard
              title="5D"
              subtitle="5-digit prediction · Even/Odd · 4 modes"
              icon={<D5SphereIcon size={44} />}
              accentType="d5"
              expanded={d5Expanded}
              setExpanded={setD5Expanded}
              subCards={D5_SUB_CARDS}
              openGrid={handleOpenGrid}
              modeCount={4}
            />

            {/* 4. TRX Card - Cyan/Blue Neon Border */}
            <GameCard
              title="TRX"
              subtitle="TRX Wingo · Big/Small · Red/Green"
              icon={<TrxCrystalIcon size={44} />}
              accentType="trx"
              expanded={trxExpanded}
              setExpanded={setTrxExpanded}
              subCards={TRX_SUB_CARDS}
              openGrid={handleOpenGrid}
              modeCount={1}
            />

            {/* Pro Traders VIP Card matching screenshot */}
            <ProTradersCard onExplore={handleProTraderClick} />

            {/* Leaderboard Section */}
            <div id="leaderboard-section">
              <LeaderboardPodium modeStates={modeStates} />
            </div>

            {/* Futuristic cyber footer */}
            <div className="text-center mt-4 pb-2">
              <div className="text-[10px] text-[#64748B] font-mono tracking-widest uppercase animate-text-glow">
                2026 V1 © {APP_CONFIG.name} · PREMIUM CYBER HUB
              </div>
            </div>
          </div>
        )}

        {/* 2. MARKET CHOICE VIEW */}
        {currentView === 'marketChoice' && (
          <MarketChoiceView
            mode={selectedMode}
            onSelect={handleSelectMarket}
            onBack={() => setCurrentView(isProUnlocked ? 'proModes' : 'home')}
          />
        )}

        {/* 3. SERVER/ENGINE GRID VIEW */}
        {currentView === 'grid' && (
          <ServerGridView
            mode={selectedMode}
            market={selectedMarket}
            engines={activeEngines}
            onBack={() => setCurrentView('home')}
            onSelectRule={handleSelectRule}
            time={timeString}
          />
        )}

        {/* 4. SERVER PASSWORD LOCK SCREEN */}
        {currentView === 'locked' && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 px-1 pt-4 pb-3">
              <button
                onClick={() => setCurrentView(lockReturnView)}
                className="w-10 h-10 rounded-xl border border-[rgba(160,32,240,0.4)] bg-[#0B0718] flex items-center justify-center cursor-pointer text-white text-base transition-all hover:border-[#00B7FF] hover:shadow-[0_0_12px_rgba(0,183,255,0.3)] active:scale-95"
              >
                ←
              </button>
              <div className="flex-1">
                <div className="text-base font-extrabold text-white">Hack Login</div>
                <div className="text-[11px] text-[#00B7FF] font-mono">
                  {selectedEngineId ? `SERVER #${selectedEngineId} · ` : ''}TELEGRAM VERIFICATION
                </div>
              </div>
            </div>
            <LockScreen
              onUnlock={handleUnlockNormal}
              serverName={selectedEngineId ? `SERVER #${selectedEngineId}` : undefined}
            />
          </div>
        )}

        {/* 5. PRO TRADER PASSWORD LOCK SCREEN */}
        {currentView === 'proLocked' && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 px-1 pt-4 pb-3">
              <button
                onClick={() => setCurrentView('home')}
                className="w-10 h-10 rounded-xl border border-[rgba(255,200,61,0.4)] bg-[#0B0718] flex items-center justify-center cursor-pointer text-white text-base transition-all hover:border-[#FFC83D] hover:shadow-[0_0_12px_rgba(255,200,61,0.3)] active:scale-95"
              >
                ←
              </button>
              <div className="flex-1">
                <div className="text-base font-extrabold text-white">👑 Pro Traders</div>
                <div className="text-[11px] text-[#A8A3B8] font-mono">VIP ACCESS REQUIRED</div>
              </div>
            </div>
            <LockScreen
              onUnlock={handleUnlockPro}
              serverName="Pro Traders · VIP Section"
              isProTrader={true}
            />
          </div>
        )}

        {/* 6. PRO TRADERS MODE SELECTION */}
        {currentView === 'proModes' && (
          <ProTradersView
            onBack={() => setCurrentView('home')}
            onSelectModeMarket={handleProModeMarketSelect}
          />
        )}

        {/* 7. PREDICTION DASHBOARD VIEW */}
        {currentView === 'prediction' && (
          <SignalDisplayView
            mode={selectedMode}
            market={selectedMarket}
            engine={activeEngines.find((e) => e.id === selectedEngineId)}
            history={currentModeState.history}
            onBack={() => setCurrentView('grid')}
            time={timeString}
          />
        )}
      </main>
    </div>
  );
}

