import React from 'react';
import { ArrowRight, Home, Phone } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const { settings } = useClinic();

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-4 py-20 sm:py-28 text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800 font-mono">
          404
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2330] font-heading">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
          We couldn't find the page you were looking for. It may have moved, or the link may be
          incorrect. Use the options below to continue.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f2330] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#193b50] sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/treatments')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0f2330] transition-colors hover:bg-[#8fd622] sm:w-auto"
          >
            Browse Treatments
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            <Phone className="h-4 w-4 text-emerald-600" />
            Contact Us
          </button>
        </div>

        {settings.phone && settings.phoneRaw && (
          <p className="mt-8 text-sm text-slate-600">
            Need help now? Call{' '}
            <a href={`tel:${settings.phoneRaw}`} className="font-semibold text-emerald-700 hover:underline">
              {settings.phone}
            </a>
          </p>
        )}
      </section>
    </div>
  );
};
