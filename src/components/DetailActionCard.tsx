import React from 'react';
import { Calendar, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';

interface DetailActionCardProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  highlights?: string[];
  ctaLabel: string;
  reassurance?: string;
  phone?: string;
  onBook: () => void;
}

export const DetailActionCard: React.FC<DetailActionCardProps> = ({
  eyebrow,
  heading,
  description,
  highlights = [],
  ctaLabel,
  reassurance,
  phone,
  onBook,
}) => (
  <aside className="sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
    <div className="relative overflow-hidden bg-[#0f2330] px-6 py-7 text-white">
      <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/10" aria-hidden="true" />
      <div className="absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-lime-300/10" aria-hidden="true" />
      <div className="relative">
        {eyebrow && (
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-lime-300">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-extrabold leading-tight font-heading">{heading}</h2>
        {description && <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>}
      </div>
    </div>

    <div className="space-y-5 p-6">
      {highlights.length > 0 && (
        <ul className="space-y-3" aria-label="Appointment information">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onBook}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#a3e635] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0f2330] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#8fd622] hover:shadow-md active:translate-y-0"
      >
        <Calendar className="h-4 w-4" />
        <span>{ctaLabel}</span>
      </button>

      {(reassurance || phone) && (
        <div className="space-y-2 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
          {reassurance && (
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>{reassurance}</span>
            </p>
          )}
          {phone && (
            <p className="flex items-center gap-2 font-semibold text-slate-700">
              <Phone className="h-4 w-4 text-emerald-700" />
              <span>{phone}</span>
            </p>
          )}
        </div>
      )}
    </div>
  </aside>
);
