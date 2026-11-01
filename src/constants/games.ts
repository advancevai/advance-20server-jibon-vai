import { GameConfig, GameMode } from '../types';

export const GAME_CONFIGS: Record<GameMode, GameConfig> = {
  '30s': {
    apiBase: 'WinGo',
    apiPath: 'WinGo_30S',
    timerMod: 30,
    label: '𝐖𝐈𝐍𝐆𝐎 𝟑𝟎 𝐒𝐄𝐂',
    badge: '30S',
    market: 'big-small',
    gameType: 'wingo',
  },
  '1m': {
    apiBase: 'WinGo',
    apiPath: 'WinGo_1M',
    timerMod: 60,
    label: '𝐖𝐈𝐍𝐆𝐎 𝟏 𝐌𝐈𝐍',
    badge: '1M',
    market: 'big-small',
    gameType: 'wingo',
  },
  '3m': {
    apiBase: 'WinGo',
    apiPath: 'WinGo_3M',
    timerMod: 180,
    label: '𝐖𝐈𝐍𝐆𝐎 𝟑 𝐌𝐈𝐍',
    badge: '3M',
    market: 'big-small',
    gameType: 'wingo',
  },
  '5m': {
    apiBase: 'WinGo',
    apiPath: 'WinGo_5M',
    timerMod: 300,
    label: '𝐖𝐈𝐍𝐆𝐎 𝟓 𝐌𝐈𝐍',
    badge: '5M',
    market: 'big-small',
    gameType: 'wingo',
  },
  k3_1m: {
    apiBase: 'K3',
    apiPath: 'K3_1M',
    timerMod: 60,
    label: '𝐊𝟑 𝟏 𝐌𝐈𝐍',
    badge: '1M',
    market: 'even-odd',
    gameType: 'k3',
  },
  k3_3m: {
    apiBase: 'K3',
    apiPath: 'K3_3M',
    timerMod: 180,
    label: '𝐊𝟑 𝟑 𝐌𝐈𝐍',
    badge: '3M',
    market: 'even-odd',
    gameType: 'k3',
  },
  k3_5m: {
    apiBase: 'K3',
    apiPath: 'K3_5M',
    timerMod: 300,
    label: '𝐊𝟑 𝟓 𝐌𝐈𝐍',
    badge: '5M',
    market: 'even-odd',
    gameType: 'k3',
  },
  k3_10m: {
    apiBase: 'K3',
    apiPath: 'K3_10M',
    timerMod: 600,
    label: '𝐊𝟑 𝟏𝟎 𝐌𝐈𝐍',
    badge: '10M',
    market: 'even-odd',
    gameType: 'k3',
  },
  d5_1m: {
    apiBase: 'D5',
    apiPath: 'D5_1M',
    timerMod: 60,
    label: '𝟓𝐃 𝟏 𝐌𝐈𝐍',
    badge: '1M',
    market: 'even-odd',
    gameType: '5d',
  },
  d5_3m: {
    apiBase: 'D5',
    apiPath: 'D5_3M',
    timerMod: 180,
    label: '𝟓𝐃 𝟑 𝐌𝐈𝐍',
    badge: '3M',
    market: 'even-odd',
    gameType: '5d',
  },
  d5_5m: {
    apiBase: 'D5',
    apiPath: 'D5_5M',
    timerMod: 300,
    label: '𝟓𝐃 𝟓 𝐌𝐈𝐍',
    badge: '5M',
    market: 'even-odd',
    gameType: '5d',
  },
  d5_10m: {
    apiBase: 'D5',
    apiPath: 'D5_10M',
    timerMod: 600,
    label: '𝟓𝐃 𝟏𝟎 𝐌𝐈𝐍',
    badge: '10M',
    market: 'even-odd',
    gameType: '5d',
  },
  trx_1m: {
    apiBase: 'TrxWinGo',
    apiPath: 'TrxWinGo_1M',
    timerMod: 60,
    label: '𝐓𝐑𝐗 𝐖𝐈𝐍𝐆𝐎 𝟏𝐌𝐈𝐍',
    badge: '1M',
    market: 'big-small',
    gameType: 'trx',
  },
};

export const ENGINE_NAMES = [
  'Tiger Pro',
  'Dragon King',
  'Phoenix VIP',
  'Eagle Eye',
  'Lion Heart',
  'Thunder Bolt',
  'Shadow X',
  'Cobra Strike',
  'Wolf Pack',
  'Blaze Pro',
  'Viper Gold',
  'Rocket Star',
  'Storm Chaser',
  'Ninja Master',
  'Falcon Rush',
  'Panther VIP',
  'Ghost Rider',
  'Shark Tank',
  'Bullet Pro',
  'Dark Horse',
];

export const ENGINE_EMOJIS = [
  '🐯',
  '🐉',
  '🔥',
  '🦅',
  '🦁',
  '⚡',
  '👤',
  '🐍',
  '🐺',
  '💥',
  '🐍',
  '🚀',
  '🌪️',
  '🥷',
  '🦅',
  '🐆',
  '👻',
  '🦈',
  '💫',
  '🐴',
];

export const WINGO_MODES: GameMode[] = ['30s', '1m', '3m', '5m'];
export const K3_MODES: GameMode[] = ['k3_1m', 'k3_3m', 'k3_5m', 'k3_10m'];
export const D5_MODES: GameMode[] = ['d5_1m', 'd5_3m', 'd5_5m', 'd5_10m'];
export const TRX_MODES: GameMode[] = ['trx_1m'];
export const ALL_MODES: GameMode[] = [...WINGO_MODES, ...K3_MODES, ...D5_MODES, ...TRX_MODES];

export const WINGO_SUB_CARDS = [
  { mode: '30s' as GameMode, icon: '⚡', name: '𝐖𝐈𝐍𝐆𝐎 𝟑𝟎 𝐒𝐄𝐂', desc: 'Ultra fast prediction', badge: '30S' },
  { mode: '1m' as GameMode, icon: '⏱️', name: '𝐖𝐈𝐍𝐆𝐎 𝟏 𝐌𝐈𝐍', desc: 'Standard speed', badge: '1M' },
  { mode: '3m' as GameMode, icon: '⏳', name: '𝐖𝐈𝐍𝐆𝐎 𝟑 𝐌𝐈𝐍', desc: 'Balanced mode', badge: '3M' },
  { mode: '5m' as GameMode, icon: '🕐', name: '𝐖𝐈𝐍𝐆𝐎 𝟓 𝐌𝐈𝐍', desc: 'High accuracy', badge: '5M' },
];

export const K3_SUB_CARDS = [
  { mode: 'k3_1m' as GameMode, icon: '⏱️', name: '𝐊𝟑 𝟏 𝐌𝐈𝐍', desc: 'Fast dice game', badge: '1M' },
  { mode: 'k3_3m' as GameMode, icon: '⏳', name: '𝐊𝟑 𝟑 𝐌𝐈𝐍', desc: 'Balanced dice', badge: '3M' },
  { mode: 'k3_5m' as GameMode, icon: '🕐', name: '𝐊𝟑 𝟓 𝐌𝐈𝐍', desc: 'Standard dice', badge: '5M' },
  { mode: 'k3_10m' as GameMode, icon: '🕰️', name: '𝐊𝟑 𝟏𝟎 𝐌𝐈𝐍', desc: 'High accuracy dice', badge: '10M' },
];

export const D5_SUB_CARDS = [
  { mode: 'd5_1m' as GameMode, icon: '⏱️', name: '𝟓𝐃 𝟏 𝐌𝐈𝐍', desc: 'Fast 5-digit', badge: '1M' },
  { mode: 'd5_3m' as GameMode, icon: '⏳', name: '𝟓𝐃 𝟑 𝐌𝐈𝐍', desc: 'Balanced 5-digit', badge: '3M' },
  { mode: 'd5_5m' as GameMode, icon: '🕐', name: '𝟓𝐃 𝟓 𝐌𝐈𝐍', desc: 'Standard 5-digit', badge: '5M' },
  { mode: 'd5_10m' as GameMode, icon: '🕰️', name: '𝟓𝐃 𝟏𝟎 𝐌𝐈𝐍', desc: 'High accuracy 5D', badge: '10M' },
];

export const TRX_SUB_CARDS = [
  { mode: 'trx_1m' as GameMode, icon: '⏱️', name: '𝐓𝐑𝐗 𝐖𝐈𝐍𝐆𝐎 𝟏𝐌𝐈𝐍', desc: 'Crypto prediction', badge: '1M' },
];

export const LEADERBOARD_TABS = [
  { key: 'wingo', label: 'Wingo', modes: WINGO_MODES },
  { key: 'k3', label: 'K3', modes: K3_MODES },
  { key: '5d', label: '5D', modes: D5_MODES },
  { key: 'trx', label: 'TRX', modes: TRX_MODES },
];

export const BADGE_COLORS: Record<string, string> = {
  '30S': 'bg-[hsl(var(--green)/0.1)] text-cyan border-[hsl(var(--green)/0.2)]',
  '1M': 'bg-[hsl(var(--blue)/0.1)] text-[hsl(var(--blue))] border-[hsl(var(--blue)/0.2)]',
  '3M': 'bg-[hsl(var(--purple)/0.1)] text-[hsl(var(--purple))] border-[hsl(var(--purple)/0.2)]',
  '5M': 'bg-[hsl(var(--amber)/0.1)] text-amber-signal border-[hsl(var(--amber)/0.2)]',
  '10M': 'bg-[hsl(var(--red)/0.1)] text-red-signal border-[hsl(var(--red)/0.2)]',
};

export const GRADIENT_CLASSES = [
  'gradient-purple',
  'gradient-red',
  'gradient-gold',
  'gradient-cyan-blue',
  'gradient-teal',
  'gradient-purple',
  'gradient-red',
  'gradient-gold',
  'gradient-cyan-blue',
  'gradient-teal',
  'gradient-purple',
  'gradient-red',
  'gradient-gold',
  'gradient-cyan-blue',
  'gradient-teal',
  'gradient-purple',
  'gradient-red',
  'gradient-gold',
  'gradient-cyan-blue',
  'gradient-teal',
];

export const SVG_ICONS = {
  wingo: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <radialGradient id="wgBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0a2a1a" />
      <stop offset="60%" stop-color="#04130c" />
      <stop offset="100%" stop-color="#010604" />
    </radialGradient>
    <radialGradient id="green3D" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#86efac" />
      <stop offset="30%" stop-color="#22c55e" />
      <stop offset="75%" stop-color="#15803d" />
      <stop offset="100%" stop-color="#052e16" />
    </radialGradient>
    <radialGradient id="red3D" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#fca5a5" />
      <stop offset="30%" stop-color="#ef4444" />
      <stop offset="75%" stop-color="#b91c1c" />
      <stop offset="100%" stop-color="#450a0a" />
    </radialGradient>
    <radialGradient id="violet3D" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#d8b4fe" />
      <stop offset="30%" stop-color="#a855f7" />
      <stop offset="75%" stop-color="#7e22ce" />
      <stop offset="100%" stop-color="#3b0764" />
    </radialGradient>
    <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="70%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#854d0e" />
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="4" y="4" width="112" height="112" rx="26" fill="url(#wgBg)" stroke="url(#goldTrim)" stroke-width="1.8" stroke-opacity="0.6" />
  <circle cx="60" cy="60" r="48" stroke="#22c55e" stroke-width="1" stroke-dasharray="3 4" stroke-opacity="0.35" />
  <circle cx="60" cy="60" r="44" stroke="url(#goldTrim)" stroke-width="1" stroke-opacity="0.3" />
  <ellipse cx="60" cy="64" rx="42" ry="34" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="6 3" stroke-opacity="0.25" />
  <g filter="url(#softGlow)">
    <circle cx="40" cy="46" r="21" fill="url(#green3D)" stroke="#86efac" stroke-width="1.2" stroke-opacity="0.7" />
    <ellipse cx="34" cy="38" rx="7" ry="4" transform="rotate(-30 34 38)" fill="#ffffff" fill-opacity="0.6" />
    <text x="40" y="52" text-anchor="middle" font-family="'JetBrains Mono', system-ui, sans-serif" font-weight="900" font-size="16" fill="#ffffff" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">W</text>
  </g>
  <g filter="url(#softGlow)">
    <circle cx="80" cy="46" r="21" fill="url(#red3D)" stroke="#fca5a5" stroke-width="1.2" stroke-opacity="0.7" />
    <ellipse cx="74" cy="38" rx="7" ry="4" transform="rotate(-30 74 38)" fill="#ffffff" fill-opacity="0.6" />
    <text x="80" y="52" text-anchor="middle" font-family="'JetBrains Mono', system-ui, sans-serif" font-weight="900" font-size="16" fill="#ffffff" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">G</text>
  </g>
  <g filter="url(#softGlow)">
    <circle cx="60" cy="78" r="20" fill="url(#violet3D)" stroke="#d8b4fe" stroke-width="1.2" stroke-opacity="0.7" />
    <ellipse cx="54" cy="71" rx="6" ry="3.5" transform="rotate(-30 54 71)" fill="#ffffff" fill-opacity="0.6" />
    <text x="60" y="84" text-anchor="middle" font-family="'JetBrains Mono', system-ui, sans-serif" font-weight="900" font-size="15" fill="#ffffff" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">0</text>
  </g>
  <path d="M60 52 L62 58 L68 60 L62 62 L60 68 L58 62 L52 60 L58 58 Z" fill="url(#goldTrim)" filter="url(#softGlow)" />
  <circle cx="60" cy="60" r="2" fill="#ffffff" />
</svg>`)}`,

  k3: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <radialGradient id="k3Bg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#2c1602" />
      <stop offset="60%" stop-color="#140a01" />
      <stop offset="100%" stop-color="#050200" />
    </radialGradient>
    <linearGradient id="diceTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="50%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="diceLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="70%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>
    <linearGradient id="diceRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="70%" stop-color="#92400e" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
    <linearGradient id="redDiceTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fca5a5" />
      <stop offset="50%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="redDiceLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#7f1d1d" />
    </linearGradient>
    <linearGradient id="redDiceRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#991b1b" />
      <stop offset="100%" stop-color="#450a0a" />
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="4" y="4" width="112" height="112" rx="26" fill="url(#k3Bg)" stroke="#f59e0b" stroke-width="1.8" stroke-opacity="0.6" />
  <circle cx="60" cy="60" r="48" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.3" />
  <circle cx="60" cy="60" r="44" stroke="#fbbf24" stroke-width="1" stroke-opacity="0.2" />
  <g transform="translate(18, -4)">
    <polygon points="56,22 78,34 56,46 34,34" fill="url(#redDiceTop)" stroke="#fee2e2" stroke-width="1" />
    <polygon points="34,34 56,46 56,72 34,60" fill="url(#redDiceLeft)" stroke="#f87171" stroke-width="1" />
    <polygon points="56,46 78,34 78,60 56,72" fill="url(#redDiceRight)" stroke="#f87171" stroke-width="1" />
    <circle cx="56" cy="34" r="3" fill="#ffffff" />
    <circle cx="45" cy="50" r="2.5" fill="#ffffff" />
    <circle cx="45" cy="58" r="2.5" fill="#ffffff" />
    <circle cx="67" cy="50" r="2.5" fill="#ffffff" />
    <circle cx="67" cy="58" r="2.5" fill="#ffffff" />
  </g>
  <g filter="url(#goldGlow)" transform="translate(-4, 10)">
    <polygon points="50,22 76,36 50,50 24,36" fill="url(#diceTop)" stroke="#fef08a" stroke-width="1.5" stroke-linejoin="round" />
    <polygon points="24,36 50,50 50,80 24,66" fill="url(#diceLeft)" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round" />
    <polygon points="50,50 76,36 76,66 50,80" fill="url(#diceRight)" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round" />
    <circle cx="37" cy="32" r="3" fill="#ffffff" />
    <circle cx="50" cy="36" r="3" fill="#ffffff" />
    <circle cx="63" cy="40" r="3" fill="#ffffff" />
    <circle cx="33" cy="46" r="2.8" fill="#ffffff" />
    <circle cx="43" cy="51" r="2.8" fill="#ffffff" />
    <circle cx="37" cy="58" r="2.8" fill="#ffffff" />
    <circle cx="31" cy="65" r="2.8" fill="#ffffff" />
    <circle cx="41" cy="70" r="2.8" fill="#ffffff" />
    <circle cx="58" cy="51" r="2.8" fill="#ffffff" />
    <circle cx="68" cy="46" r="2.8" fill="#ffffff" />
    <circle cx="58" cy="70" r="2.8" fill="#ffffff" />
    <circle cx="68" cy="65" r="2.8" fill="#ffffff" />
  </g>
  <path d="M22 28 L24 33 L29 35 L24 37 L22 42 L20 37 L15 35 L20 33 Z" fill="#fbbf24" filter="url(#goldGlow)" />
  <path d="M98 78 L100 82 L104 84 L100 86 L98 90 L96 86 L92 84 L96 82 Z" fill="#fbbf24" filter="url(#goldGlow)" />
</svg>`)}`,

  d5: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <radialGradient id="d5Bg" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#240c38" />
      <stop offset="60%" stop-color="#12041e" />
      <stop offset="100%" stop-color="#05010a" />
    </radialGradient>
    <radialGradient id="holoSphere" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f5d0fe" />
      <stop offset="25%" stop-color="#c084fc" />
      <stop offset="65%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#2e1065" />
    </radialGradient>
    <linearGradient id="d5Chrome" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="45%" stop-color="#e9d5ff" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <linearGradient id="neonRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#f43f5e" />
    </linearGradient>
    <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="4" y="4" width="112" height="112" rx="26" fill="url(#d5Bg)" stroke="#c084fc" stroke-width="1.8" stroke-opacity="0.6" />
  <circle cx="60" cy="60" r="48" stroke="#a855f7" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.35" />
  <ellipse cx="60" cy="60" rx="46" ry="18" transform="rotate(-30 60 60)" stroke="url(#neonRing)" stroke-width="1.8" stroke-opacity="0.75" />
  <ellipse cx="60" cy="60" rx="46" ry="18" transform="rotate(35 60 60)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="5 3" stroke-opacity="0.45" />
  <circle cx="20" cy="44" r="6" fill="#ec4899" stroke="#fbcfe8" stroke-width="1" filter="url(#purpleGlow)" />
  <circle cx="98" cy="40" r="6.5" fill="#38bdf8" stroke="#bae6fd" stroke-width="1" filter="url(#purpleGlow)" />
  <circle cx="34" cy="85" r="5" fill="#eab308" stroke="#fef08a" stroke-width="1" filter="url(#purpleGlow)" />
  <circle cx="86" cy="84" r="5.5" fill="#10b981" stroke="#a7f3d0" stroke-width="1" filter="url(#purpleGlow)" />
  <g filter="url(#purpleGlow)">
    <circle cx="60" cy="60" r="30" fill="url(#holoSphere)" stroke="#e9d5ff" stroke-width="1.5" stroke-opacity="0.8" />
    <ellipse cx="52" cy="48" rx="10" ry="5.5" transform="rotate(-30 52 48)" fill="#ffffff" fill-opacity="0.5" />
  </g>
  <text x="60" y="70" text-anchor="middle" font-family="'JetBrains Mono', system-ui, sans-serif" font-weight="900" font-size="28" fill="url(#d5Chrome)" letter-spacing="1" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.9)); text-shadow: 0 0 10px #c084fc">5D</text>
  <circle cx="60" cy="18" r="2.5" fill="#c084fc" />
  <circle cx="60" cy="102" r="2.5" fill="#38bdf8" />
</svg>`)}`,

  trx: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <radialGradient id="trxBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#071d36" />
      <stop offset="60%" stop-color="#030d1a" />
      <stop offset="100%" stop-color="#01050a" />
    </radialGradient>
    <linearGradient id="facetTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0f2fe" />
      <stop offset="60%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="facetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="60%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#082f49" />
    </linearGradient>
    <linearGradient id="facetCenter" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="50%" stop-color="#0ea5e9" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="facetRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="60%" stop-color="#075985" />
      <stop offset="100%" stop-color="#0c4a6e" />
    </linearGradient>
    <linearGradient id="facetBottom" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#082f49" />
    </linearGradient>
    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="4" y="4" width="112" height="112" rx="26" fill="url(#trxBg)" stroke="#38bdf8" stroke-width="1.8" stroke-opacity="0.6" />
  <polygon points="60,14 98,36 98,84 60,106 22,84 22,36" stroke="#0ea5e9" stroke-width="1.2" stroke-dasharray="6 4" stroke-opacity="0.35" />
  <circle cx="60" cy="60" r="48" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.2" />
  <line x1="22" y1="36" x2="42" y2="48" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.4" />
  <line x1="98" y1="36" x2="78" y2="48" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.4" />
  <line x1="60" y1="106" x2="60" y2="92" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.4" />
  <circle cx="22" cy="36" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
  <circle cx="98" cy="36" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
  <circle cx="60" cy="14" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
  <circle cx="60" cy="106" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
  <g filter="url(#cyanGlow)">
    <polygon points="60,22 36,46 60,54" fill="url(#facetLeft)" stroke="#e0f2fe" stroke-width="1" stroke-linejoin="round" />
    <polygon points="60,22 84,46 60,54" fill="url(#facetRight)" stroke="#e0f2fe" stroke-width="1" stroke-linejoin="round" />
    <polygon points="36,46 24,56 44,66 60,54" fill="url(#facetLeft)" stroke="#7dd3fc" stroke-width="1" stroke-linejoin="round" />
    <polygon points="84,46 96,56 76,66 60,54" fill="url(#facetRight)" stroke="#7dd3fc" stroke-width="1" stroke-linejoin="round" />
    <polygon points="60,54 44,66 60,94 76,66" fill="url(#facetCenter)" stroke="#e0f2fe" stroke-width="1.2" stroke-linejoin="round" />
    <polygon points="24,56 60,94 44,66" fill="url(#facetBottom)" stroke="#38bdf8" stroke-width="1" stroke-linejoin="round" />
    <polygon points="96,56 60,94 76,66" fill="url(#facetBottom)" stroke="#38bdf8" stroke-width="1" stroke-linejoin="round" />
    <circle cx="60" cy="64" r="4.5" fill="#ffffff" filter="url(#cyanGlow)" />
  </g>
  <rect x="36" y="90" width="48" height="15" rx="5" fill="#031f38" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.7" />
  <text x="60" y="101" text-anchor="middle" font-family="'JetBrains Mono', system-ui, sans-serif" font-weight="900" font-size="10" fill="#38bdf8" letter-spacing="2">TRX</text>
</svg>`)}`,
};
