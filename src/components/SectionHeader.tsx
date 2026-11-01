import React from 'react';

interface SectionHeaderProps {
  icon: string | React.ReactNode;
  titlePrimary: string;
  titleSecondary?: string;
  onViewAll?: () => void;
  withSlashes?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  titlePrimary,
  titleSecondary,
  onViewAll,
  withSlashes = true,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 my-3 px-1 select-none">
      {/* Title Group */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xl drop-shadow-[0_0_12px_rgba(160,32,240,0.85)] flex-shrink-0">
          {icon}
        </span>
        <div className="flex items-center gap-1.5 font-black italic tracking-wide text-[15px] uppercase">
          <span className="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {titlePrimary}
          </span>
          {titleSecondary && (
            <span className="text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              {titleSecondary}
            </span>
          )}
        </div>

        {/* Diagonal rainbow striped hash marks like screenshot */}
        {withSlashes && (
          <div className="flex items-center gap-0.5 ml-1 select-none">
            <span className="w-1.5 h-3.5 bg-[#00FFA3] transform -skew-x-25 rounded-xs opacity-90 shadow-[0_0_6px_#00FFA3]" />
            <span className="w-1.5 h-3.5 bg-[#FFC83D] transform -skew-x-25 rounded-xs opacity-90 shadow-[0_0_6px_#FFC83D]" />
            <span className="w-1.5 h-3.5 bg-[#FF20C8] transform -skew-x-25 rounded-xs opacity-90 shadow-[0_0_6px_#FF20C8]" />
          </div>
        )}
      </div>

      {/* View All Button on Right (Golden Amber Pill like Screenshot) */}
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="font-mono text-[10.5px] font-black text-[#FFC83D] bg-gradient-to-r from-[rgba(255,200,61,0.15)] to-[rgba(245,158,11,0.22)] border border-[#FFC83D] px-3.5 py-1 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-[rgba(255,200,61,0.3)] hover:shadow-[0_0_16px_rgba(255,200,61,0.6)] transition-all active:scale-95 flex-shrink-0 shadow-[0_0_10px_rgba(255,200,61,0.3)]"
        >
          <span>View All</span>
          <span className="text-xs font-black">➔</span>
        </button>
      )}
    </div>
  );
};
