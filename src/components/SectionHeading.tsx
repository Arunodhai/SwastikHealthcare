import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3 ${
          dark
            ? 'bg-emerald-950/80 text-lime-400 border border-emerald-800/60'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-heading ${
          dark ? 'text-white' : 'text-[#0f2330]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-slate-300' : 'text-slate-600'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
