import React, { useEffect, useState } from 'react';
import { Send, KeyRound, ShieldCheck, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { AppSettings } from '../types';
import { DEFAULT_SETTINGS, fetchSettings, PG_KEY, PG_URL } from '../services/api';
import { APP_CONFIG } from '../constants/config';
import { AdvanceHackLogo } from './AdvanceHackLogo';

interface LockScreenProps {
  onUnlock: (password: string) => Promise<boolean>;
  serverName?: string;
  isProTrader?: boolean;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  onUnlock,
  serverName,
  isProTrader = false,
}) => {
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [telegramVisited, setTelegramVisited] = useState(false);

  const telegramLink = settings.joinTelegramLink || APP_CONFIG.telegram;

  useEffect(() => {
    fetchSettings().then(setSettings);

    // Auto-check session token on mount if already stored
    const token = localStorage.getItem('pg_token');
    if (token && !isProTrader) {
      fetch(`${PG_URL}/api/public/v1/session`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': PG_KEY },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.valid) {
            onUnlock(password);
          } else {
            localStorage.removeItem('pg_token');
          }
        })
        .catch(() => {});
    }
  }, [isProTrader, onUnlock, password]);

  // Open Telegram channel explicitly
  const handleOpenTelegram = () => {
    setTelegramVisited(true);
    setStatusMessage('✈️ Opening Telegram Channel... Copy the password and return here.');
    setIsError(false);
    window.open(telegramLink, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = password.trim();

    // If password is empty, redirect user directly to Telegram to get it!
    if (!cleanPassword) {
      setTelegramVisited(true);
      setIsError(true);
      setStatusMessage('✈️ Redirecting to Telegram to get your Hack Password...');
      window.open(telegramLink, '_blank');
      return;
    }

    if (loading) return;

    // MANDATORY: Before hack login occurs, take the user to Telegram channel!
    // Directly trigger window.open in this user-initiated event so browser won't block it.
    window.open(telegramLink, '_blank');
    setTelegramVisited(true);

    setLoading(true);
    setStatusMessage('🚀 Opening Telegram & Verifying Hack Access…');
    setIsError(false);

    try {
      // 1. Check PassGate API
      const res = await fetch(`${PG_URL}/api/public/v1/verify`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': PG_KEY },
        body: JSON.stringify({ password: cleanPassword }),
      }).then((r) => r.json()).catch(() => null);

      if (res && res.valid) {
        if (res.token) {
          localStorage.setItem('pg_token', res.token);
        }
        setIsSuccess(true);
        setStatusMessage('✅ Hack Login Verified! Entering Dashboard…');
        // Brief pause to display the success state and allow Telegram tab to open smoothly
        await new Promise((r) => setTimeout(r, 600));
        await onUnlock(cleanPassword);
        setLoading(false);
        return;
      }

      // If PassGate returned an explicit security reason
      if (res && res.reason) {
        if (res.reason === 'rate_limited') {
          setStatusMessage('Too many attempts. Try again later.');
        } else if (res.reason === 'ip_blocked') {
          setStatusMessage('Access from your network is blocked.');
        } else if (res.reason === 'origin_not_allowed') {
          setStatusMessage('This site is not allowed for this key.');
        } else if (res.reason === 'invalid_api_key') {
          setStatusMessage('API key is wrong or revoked.');
        }
      }
    } catch {
      // PassGate server unreachable, fallback to local settings
    }

    // 2. Fallback check local / backend access
    const localSuccess = await onUnlock(cleanPassword);
    setLoading(false);

    if (localSuccess) {
      setIsSuccess(true);
      setStatusMessage('✅ Hack Login Verified! Entering Dashboard…');
      return;
    }

    // Wrong password handling
    setIsError(true);
    setIsShaking(true);
    setStatusMessage('❌ Wrong Password! Please get the active password from Telegram.');

    setTimeout(() => {
      setIsShaking(false);
    }, 500);

    setPassword('');
  };

  return (
    <div
      id="pg-gate"
      className="max-w-[440px] mx-auto min-h-[68vh] flex flex-col items-center justify-center px-2 py-4 relative z-[1]"
    >
      <div className="w-full max-w-[360px] cyber-card p-5 text-center border-[rgba(160,32,240,0.4)] shadow-[0_0_35px_rgba(114,0,255,0.3)] relative overflow-hidden">
        {/* Subtle decorative cyber glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00B7FF] to-transparent animate-pulse" />

        {/* Logo Emblem */}
        <div className="flex justify-center mb-3">
          <AdvanceHackLogo size={68} />
        </div>

        {/* Title & Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(0,183,255,0.12)] border border-[rgba(0,183,255,0.35)] text-[#00FFFF] text-[10px] font-mono font-bold tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-[#00FFA3]" />
          <span>{isProTrader ? 'VIP PRO ACCESS' : 'HACK LOGIN PORTAL'}</span>
        </div>

        <h1 className="text-xl font-black text-white mb-1 tracking-tight">
          {isProTrader ? '👑 Pro Traders Login' : `${APP_CONFIG.name} Hack Login`}
        </h1>

        {serverName && (
          <p className="text-xs text-[#00B7FF] font-mono mb-1 font-bold">{serverName}</p>
        )}

        <p className="text-[11.5px] text-[#A8A3B8] mb-4 leading-relaxed">
          {isProTrader
            ? 'হ্যাক লগইন করার আগে টেলিগ্রাম থেকে ভিআইপি পাসওয়ার্ড সংগ্রহ করুন।'
            : 'হ্যাক লগইন হওয়ার আগে টেলিগ্রাম চ্যানেলে যুক্ত হয়ে পাসওয়ার্ড নিন।'}
        </p>

        {/* ================= STEP 1: MANDATORY TELEGRAM REDIRECT ================= */}
        <div className="mb-4 text-left p-3 rounded-xl bg-[rgba(14,165,233,0.08)] border border-[rgba(0,183,255,0.35)] shadow-[0_0_15px_rgba(0,183,255,0.1)] relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#38BDF8] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00B7FF] animate-ping inline-block" />
              ধাপ ১ · STEP 1
            </span>
            {telegramVisited ? (
              <span className="text-[10px] text-[#00FFA3] font-bold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" /> পরিদর্শিত
              </span>
            ) : (
              <span className="text-[9.5px] text-[#FFC83D] font-mono font-bold bg-[rgba(255,200,61,0.15)] px-2 py-0.5 rounded">
                লগইন করার আগে জরুরি
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#E2E8F0] mb-2.5 font-medium leading-snug">
            Telegram চ্যানেলে জয়েন করুন এবং আজকের হ্যাক পাসওয়ার্ডটি সংগ্রহ করুন:
          </p>

          <button
            type="button"
            onClick={handleOpenTelegram}
            className="w-full py-2.5 px-3 rounded-lg font-black text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#0088cc] to-[#00b4d8] text-white hover:brightness-110 active:scale-95 shadow-[0_0_18px_rgba(0,180,216,0.45)] border border-[#38bdf8]"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>👉 টেলিগ্রাম এ যান (GET PASSWORD)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* ================= STEP 2: ENTER HACK PASSWORD ================= */}
        <div className="text-left mb-2">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#C084FC] flex items-center gap-1">
              <KeyRound className="w-3 h-3 text-[#A020F0]" />
              ধাপ ২ · STEP 2: পাসওয়ার্ড দিন
            </span>
            <span className="text-[9.5px] text-[#94A3B8] font-mono">
              Auto Redirects to TG
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`w-full ${isShaking ? 'animate-shake' : ''}`}
          >
            <div className="relative mb-2">
              <input
                id="pg-pass"
                type="password"
                placeholder="Enter Hack Password / পাসওয়ার্ড দিন"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsError(false);
                  setIsSuccess(false);
                  setStatusMessage('');
                }}
                className="w-full flex h-12 rounded-xl border border-[rgba(160,32,240,0.45)] bg-[rgba(11,7,24,0.95)] px-4 py-2 text-center text-sm font-semibold text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00B7FF] focus:shadow-[0_0_16px_rgba(0,183,255,0.4)] transition-all font-mono"
                autoFocus
              />
            </div>

            {/* Status message */}
            <div
              id="pg-msg"
              className={`min-h-[22px] text-[11px] font-mono text-center mb-2.5 font-bold transition-all px-1 leading-tight ${
                isError
                  ? 'text-[#FF2B5E]'
                  : isSuccess
                  ? 'text-[#00FFA3]'
                  : 'text-[#38BDF8]'
              }`}
            >
              {statusMessage || (
                <span className="text-[#64748B] font-normal">
                  ⚡ লগইন বাটনে ক্লিক করলে টেলিগ্রাম এ নিয়ে যাবে
                </span>
              )}
            </div>

            {/* Submit button */}
            <button
              id="pg-btn"
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-black text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-95 border flex items-center justify-center gap-2 ${
                isProTrader
                  ? 'bg-gradient-to-r from-[#FFC83D] via-[#F59E0B] to-[#D97706] text-black border-[#FFC83D] shadow-[0_0_20px_rgba(255,200,61,0.4)] hover:brightness-110'
                  : 'bg-gradient-to-r from-[#7200FF] via-[#0088cc] to-[#00B7FF] text-white border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)] hover:brightness-110'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {loading
                  ? 'Verifying & Redirecting…'
                  : isProTrader
                  ? '👑 VIP Hack Login'
                  : '🔓 HACK LOGIN (হ্যাক লগইন)'}
              </span>
            </button>
          </form>
        </div>

        {/* Footer Quick Links */}
        <div className="flex gap-2 mt-4 w-full">
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTelegramVisited(true)}
            className="flex-1 py-2 rounded-xl text-center text-[10.5px] font-bold bg-[rgba(160,32,240,0.15)] text-[#C084FC] border border-[rgba(160,32,240,0.4)] hover:bg-[rgba(160,32,240,0.25)] transition-all active:scale-95 flex items-center justify-center gap-1"
          >
            <span>💬 Dev Support</span>
          </a>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTelegramVisited(true)}
            className="flex-1 py-2 rounded-xl text-center text-[10.5px] font-bold bg-[rgba(0,183,255,0.15)] text-[#38BDF8] border border-[rgba(0,183,255,0.4)] hover:bg-[rgba(0,183,255,0.25)] transition-all active:scale-95 flex items-center justify-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>Join Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
