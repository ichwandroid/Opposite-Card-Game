import React from 'react';

interface CardCornerFiligreeProps {
  className?: string;
  color?: string;
}

export const CardCornerFiligree: React.FC<CardCornerFiligreeProps> = ({
  className = '',
  color = '#D97706',
}) => {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 pointer-events-none select-none ${className}`}
    >
      {/* Outer corner L bracket */}
      <path
        d="M2 22V6C2 3.79086 3.79086 2 6 2H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner decorative flourish */}
      <path
        d="M6 16V9C6 7.34315 7.34315 6 9 6H16"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Center corner gem / diamond */}
      <polygon points="5,5 8,2 11,5 8,8" fill={color} />
      {/* Corner leaf dot */}
      <circle cx="2" cy="22" r="1.5" fill={color} />
      <circle cx="22" cy="2" r="1.5" fill={color} />
    </svg>
  );
};

export const CardGemCrest: React.FC<{ color?: string; className?: string }> = ({
  color = '#F59E0B',
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 40 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-4">
        {/* Horizontal filigree wings */}
        <path d="M0 9H12M28 9H40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="2" cy="9" r="1.5" fill={color} />
        <circle cx="38" cy="9" r="1.5" fill={color} />
        {/* Diamond frame */}
        <polygon points="20,1 27,9 20,17 13,9" fill="#FFFBEB" stroke={color} strokeWidth="1.5" />
        {/* Center glowing ruby/amber gem */}
        <polygon points="20,4 24,9 20,14 16,9" fill={color} />
        {/* Highlight sparkle */}
        <circle cx="18.5" cy="7.5" r="0.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export const CardStarsRarity: React.FC<{ count?: number; className?: string }> = () => {
  return null;
};

interface GameCardFrameDecorProps {
  theme?: 'gold' | 'emerald' | 'amber' | 'teal' | 'purple' | 'slate';
  showStars?: boolean;
}

export const GameCardFrameDecor: React.FC<GameCardFrameDecorProps> = ({
  theme = 'gold',
}) => {
  const colorMap = {
    purple: {
      bracket: '#9333EA',
      border: 'border-purple-300/80',
      glow: 'shadow-[inset_0_0_12px_rgba(147,51,234,0.12)]',
    },
    amber: {
      bracket: '#D97706',
      border: 'border-amber-300/80',
      glow: 'shadow-[inset_0_0_12px_rgba(245,158,11,0.12)]',
    },
    teal: {
      bracket: '#0D9488',
      border: 'border-teal-300/80',
      glow: 'shadow-[inset_0_0_12px_rgba(13,148,136,0.12)]',
    },
    gold: {
      bracket: '#D97706',
      border: 'border-amber-300/70',
      glow: 'shadow-[inset_0_0_12px_rgba(245,158,11,0.08)]',
    },
    emerald: {
      bracket: '#059669',
      border: 'border-emerald-300/70',
      glow: 'shadow-[inset_0_0_12px_rgba(16,185,129,0.08)]',
    },
    slate: {
      bracket: '#94A3B8',
      border: 'border-slate-300/60',
      glow: '',
    },
  };

  const currentTheme = colorMap[theme] || colorMap.gold;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[14px]">
      {/* Delicate Inset Ornamental Border */}
      <div
        className={`absolute inset-1.5 rounded-[10px] border-2 border-dashed ${currentTheme.border} ${currentTheme.glow}`}
      />

      {/* 4 Corner Game Card Filigrees */}
      <div className="absolute top-1 left-1">
        <CardCornerFiligree color={currentTheme.bracket} />
      </div>
      <div className="absolute top-1 right-1 rotate-90">
        <CardCornerFiligree color={currentTheme.bracket} />
      </div>
      <div className="absolute bottom-1 left-1 -rotate-90">
        <CardCornerFiligree color={currentTheme.bracket} />
      </div>
      <div className="absolute bottom-1 right-1 rotate-180">
        <CardCornerFiligree color={currentTheme.bracket} />
      </div>

      {/* Top Center Gem Crest */}
      <div className="absolute top-0.5 left-1/2 -translate-x-1/2">
        <CardGemCrest color={currentTheme.bracket} />
      </div>
    </div>
  );
};
