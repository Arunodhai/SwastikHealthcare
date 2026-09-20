import React from 'react';

interface SwastikEmblemProps {
  className?: string;
  size?: number | string;
  priority?: boolean;
}

/**
 * High-fidelity Vector SVG replica of the official Swastik Healthcare circular emblem:
 * - Deep royal blue outer ring with arched white "SWASTIK" and "HEALTHCARE"
 * - Lime green middle ring with two sacred Swastik symbols
 * - Central royal blue disc with 3-stage rehab figures:
 *   1. Wheelchair rehabilitation patient (Phase 1)
 *   2. Patient rising & walking with support cane (Phase 2)
 *   3. Fully recovered patient standing proud & upright (Phase 3)
 * - "SINCE : 2009" founded milestone
 */
export const SwastikEmblem: React.FC<SwastikEmblemProps> = ({
  className = 'w-10 h-10',
  size,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 300 300"
      className={`shrink-0 select-none ${className}`}
      style={style}
      aria-label="Swastik Healthcare Emblem - Since 2009"
    >
      <defs>
        {/* Top arc for SWASTIK */}
        <path id="svg-swastik-top" d="M 38,150 A 112,112 0 0,1 262,150" fill="none" />
        {/* Bottom arc for HEALTHCARE (reading clockwise along bottom) */}
        <path id="svg-healthcare-bottom" d="M 262,150 A 112,112 0 0,1 38,150" fill="none" />
      </defs>

      {/* Outer Deep Royal Blue Ring */}
      <circle cx="150" cy="150" r="146" fill="#084298" stroke="#063275" strokeWidth="2" />

      {/* Outer Curved Text: SWASTIK */}
      <text
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill="#ffffff"
        letterSpacing="4.5"
      >
        <textPath href="#svg-swastik-top" startOffset="50%" textAnchor="middle">
          SWASTIK
        </textPath>
      </text>

      {/* Outer Curved Text: HEALTHCARE */}
      <text
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="#ffffff"
        letterSpacing="4"
      >
        <textPath href="#svg-healthcare-bottom" startOffset="50%" textAnchor="middle">
          HEALTHCARE
        </textPath>
      </text>

      {/* Vibrant Lime Green Middle Ring */}
      <circle cx="150" cy="150" r="105" fill="#84cc16" stroke="#084298" strokeWidth="3" />

      {/* Left Traditional Swastik Symbol at 9 o'clock */}
      <g transform="translate(64, 150) scale(0.68)" stroke="#084298" strokeWidth="3.2" strokeLinecap="square" fill="none">
        <line x1="-12" y1="0" x2="12" y2="0" />
        <line x1="0" y1="-12" x2="0" y2="12" />
        <line x1="0" y1="-12" x2="8" y2="-12" />
        <line x1="12" y1="0" x2="12" y2="8" />
        <line x1="0" y1="12" x2="-8" y2="12" />
        <line x1="-12" y1="0" x2="-12" y2="-8" />
      </g>

      {/* Right Traditional Swastik Symbol at 3 o'clock */}
      <g transform="translate(236, 150) scale(0.68)" stroke="#084298" strokeWidth="3.2" strokeLinecap="square" fill="none">
        <line x1="-12" y1="0" x2="12" y2="0" />
        <line x1="0" y1="-12" x2="0" y2="12" />
        <line x1="0" y1="-12" x2="8" y2="-12" />
        <line x1="12" y1="0" x2="12" y2="8" />
        <line x1="0" y1="12" x2="-8" y2="12" />
        <line x1="-12" y1="0" x2="-12" y2="-8" />
      </g>

      {/* Central Circular Disc (Royal Blue) */}
      <circle cx="150" cy="150" r="78" fill="#0052cc" stroke="#ffffff" strokeWidth="2.5" />

      {/* Subtle baseline / floor ground in rehab studio */}
      <line x1="88" y1="184" x2="212" y2="184" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />

      {/* 1. LEFT FIGURE: Wheelchair rehabilitation (Phase 1) */}
      <g transform="translate(94, 142)">
        <circle cx="14" cy="24" r="14" fill="none" stroke="#ffffff" strokeWidth="2" />
        <circle cx="14" cy="24" r="11" fill="none" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2,2" />
        <circle cx="14" cy="24" r="2.5" fill="#ffffff" />
        <line x1="14" y1="10" x2="14" y2="38" stroke="#ffffff" strokeWidth="1" />
        <line x1="0" y1="24" x2="28" y2="24" stroke="#ffffff" strokeWidth="1" />
        <circle cx="34" cy="34" r="3.5" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M 22,28 L 32,34 L 35,32" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 2,12 L 8,14 L 14,24 L 25,24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="6" r="4.5" fill="#84cc16" />
        <path d="M 16,11 L 13,24 L 24,24 L 28,32" fill="none" stroke="#84cc16" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 15,15 L 20,20 L 16,24" fill="none" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 2. MIDDLE FIGURE: Patient rising and walking with support cane (Phase 2) */}
      <g transform="translate(142, 126)">
        <path d="M 21,30 C 23,28 25,28 26,30 L 26,58" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="13" cy="6" r="4.5" fill="#84cc16" />
        <path d="M 12,11 L 10,28" fill="none" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" />
        <path d="M 10,28 L 6,43 L 3,57" fill="none" stroke="#84cc16" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 10,28 L 15,42 L 18,57" fill="none" stroke="#84cc16" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 11,16 L 18,24 L 23,32" fill="none" stroke="#84cc16" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 3. RIGHT FIGURE: Recovered patient standing tall & confident (Phase 3) */}
      <g transform="translate(182, 124)">
        <circle cx="14" cy="5" r="4.5" fill="#84cc16" />
        <path d="M 14,10 L 14,29" fill="none" stroke="#84cc16" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M 14,29 L 10,44 L 8,59" fill="none" stroke="#84cc16" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 14,29 L 18,44 L 20,59" fill="none" stroke="#84cc16" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 13,15 L 7,21 L 12,27" fill="none" stroke="#84cc16" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 15,15 L 21,21 L 16,27" fill="none" stroke="#84cc16" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* SINCE : 2009 Founded Milestone */}
      <g transform="translate(150, 208)">
        <rect x="-42" y="-12" width="84" height="15" rx="3" fill="#ffffff" fillOpacity="0.15" />
        <text
          textAnchor="middle"
          y="0"
          fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="10.5"
          fill="#ffffff"
          letterSpacing="1.5"
        >
          SINCE : 2009
        </text>
      </g>
    </svg>
  );
};

interface SwastikBrandTextProps {
  theme?: 'light' | 'dark' | 'lime';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const SwastikBrandText: React.FC<SwastikBrandTextProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';
  const isLime = theme === 'lime';

  const nameSizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl lg:text-5xl',
  }[size];

  const taglineSizeClasses = {
    sm: 'text-[9px] sm:text-[10px] tracking-[0.14em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.16em]',
    lg: 'text-xs sm:text-sm tracking-[0.18em]',
    xl: 'text-sm sm:text-base tracking-[0.2em]',
  }[size];

  return (
    <div className="flex flex-col leading-none select-none">
      <div className={`font-extrabold font-heading tracking-tight flex items-baseline ${nameSizeClasses}`}>
        <span className={isDark ? 'text-white' : isLime ? 'text-[#0b2341]' : 'text-[#0047b3]'}>
          Swastik
        </span>
        <span className={isDark ? 'text-[#a3e635]' : isLime ? 'text-[#053d1b]' : 'text-[#65ba00]'}>
          Healthcare
        </span>
      </div>
      {showTagline && (
        <span
          className={`font-bold uppercase mt-1 ${taglineSizeClasses} ${
            isDark ? 'text-slate-300' : isLime ? 'text-[#0b2341]/80 font-extrabold' : 'text-[#1a1a1a]'
          }`}
          style={{ letterSpacing: '0.12em' }}
        >
          Physiotherapy &amp; Rehabilitation Clinic
        </span>
      )}
    </div>
  );
};

interface ClinicBrandProps {
  theme?: 'light' | 'dark' | 'lime';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  emblemClassName?: string;
  onClick?: () => void;
  className?: string;
}

export const ClinicBrand: React.FC<ClinicBrandProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
  emblemClassName,
  onClick,
  className = '',
}) => {
  const emblemSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 ${className}`}>
      <SwastikEmblem className={emblemClassName || emblemSizes} />
      <SwastikBrandText theme={theme} size={size} showTagline={showTagline} />
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        id="swastik-brand-cta-button"
        onClick={onClick}
        className="text-left group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-xl transition-transform active:scale-[0.98]"
        aria-label="Swastik Healthcare Home"
      >
        {content}
      </button>
    );
  }

  return content;
};
