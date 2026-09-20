import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Flame, Activity, Briefcase, Dumbbell, HandMetal } from 'lucide-react';
import { Treatment } from '../types/clinic';

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect: (slug: string) => void;
  onBook: (slug: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-5 h-5 text-emerald-600" />,
  Activity: <Activity className="w-5 h-5 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  Briefcase: <Briefcase className="w-5 h-5 text-emerald-600" />,
  HandMetal: <HandMetal className="w-5 h-5 text-emerald-600" />,
  Dumbbell: <Dumbbell className="w-5 h-5 text-emerald-600" />,
};

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onSelect, onBook }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Image Preview with Category Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        {treatment.heroImage && (
          <img
            src={treatment.heroImage}
            alt={treatment.heroImageAlt || treatment.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
          {iconMap[treatment.iconName] || <Activity className="w-3.5 h-3.5 text-emerald-600" />}
          <span>{treatment.categoryLabel}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[11px] font-medium text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-lime-400" />
          <span>{treatment.durationMinutes} mins</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[#0f2330] group-hover:text-emerald-800 transition-colors font-heading leading-snug">
            {treatment.title}
          </h3>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {treatment.shortDescription}
          </p>

          {/* Key highlights checklist */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            {treatment.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="truncate">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Action Links */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(treatment.slug)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group-hover:underline transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onBook(treatment.slug)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-[#a3e635] text-slate-800 hover:text-[#0f2330] transition-colors"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
