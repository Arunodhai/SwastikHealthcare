import React from 'react';

interface PageHeroProps {
  badge: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  imagePosition?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  imagePosition = 'object-[72%_20%] sm:object-[center_20%]',
}) => (
  <section className="relative isolate min-h-[390px] overflow-hidden border-b border-slate-200 bg-slate-50">
    <div className="absolute inset-0 -z-10">
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`h-full w-full object-cover ${imagePosition}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 sm:from-white sm:via-white/90 sm:to-transparent lg:from-white lg:via-white/85 lg:via-45% lg:to-transparent lg:to-70%" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>

    <div className="relative mx-auto flex min-h-[390px] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="max-w-2xl space-y-4">
        {badge}
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#0f2330] font-heading sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>

      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);
