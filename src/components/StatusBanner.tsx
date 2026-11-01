import React, { useEffect, useState } from 'react';

interface StatusBannerProps {
  isOnline: boolean;
  currentTime?: Date;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ isOnline, currentTime }) => {
  // Live real-world time ticking every second
  const [now, setNow] = useState<Date>(currentTime || new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeTime = currentTime || now;
  const hrs = String(activeTime.getHours()).padStart(2, '0');
  const mins = String(activeTime.getMinutes()).padStart(2, '0');
  const secs = String(activeTime.getSeconds()).padStart(2, '0');

  return (
    <div className="relative my-2.5 rounded-full p-[1.5px] bg-gradient-to-r from-[#00FFA3] via-[#7200FF] to-[#A020F0] shadow-[0_0_20px_rgba(114,0,255,0.4)]">
      <div className="flex items-center justify-between px-4 py-2 rounded-full bg-[rgba(6,4,14,0.96)] backdrop-blur-xl">
        {/* Left: Glowing Online Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isOnline ? 'bg-[#00FFA3]' : 'bg-[#FF2B5E]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isOnline
                  ? 'bg-[#00FFA3] shadow-[0_0_12px_#00FFA3]'
                  : 'bg-[#FF2B5E] shadow-[0_0_12px_#FF2B5E]'
              }`}
            />
          </span>
          <span
            className={`font-mono text-[11px] font-black tracking-wider ${
              isOnline ? 'text-[#00FFA3]' : 'text-[#FF2B5E]'
            } drop-shadow-[0_0_8px_rgba(0,255,163,0.6)]`}
          >
            ONLINE
          </span>
        </div>

        {/* Right: Live Digital Timer (Real-time Clock Synchronized) */}
        <div className="flex items-center gap-2 text-white font-mono text-[12px] font-bold">
          <span className="text-[#C084FC] text-sm animate-pulse">⏱</span>
          <span className="tracking-widest text-white drop-shadow-[0_0_8px_rgba(160,32,240,0.6)] font-black">
            {hrs} : {mins} : {secs}
          </span>
        </div>
      </div>
    </div>
  );
};
