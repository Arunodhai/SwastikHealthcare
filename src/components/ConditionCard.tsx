import React from 'react';
import { ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { Condition } from '../types/clinic';

interface ConditionCardProps {
  condition: Condition;
  onSelect: (slug: string) => void;
  onBook: () => void;
}

export const ConditionCard: React.FC<ConditionCardProps> = ({ condition, onSelect, onBook }) => {
  return (
    <div className="group bg-gradient-to-b from-white to-slate-50/50 rounded-2xl border border-slate-200/90 p-6 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden">
      {/* Top anatomical area tag and pulse dot */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 font-mono">
          <Activity className="w-3 h-3 text-emerald-600" />
          {condition.bodyAreaLabel}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Rehabilitation Support</span>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#0f2330] group-hover:text-emerald-800 transition-colors font-heading">
          {condition.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {condition.shortDescription}
        </p>

        {/* Distinctive symptoms tags */}
        {condition.commonSymptoms.length > 0 && <div className="mt-4 space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Common Signs:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {condition.commonSymptoms.slice(0, 3).map((symptom, i) => (
              <span
                key={i}
                className="text-[11px] bg-white border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-full shadow-2xs"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>}

        {/* Clinical approach highlight */}
        <div className="mt-4 p-3 rounded-xl bg-slate-100/70 border border-slate-200/60 text-xs text-slate-700 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Physiotherapy Focus</span>
          </div>
          <p className="text-[11px] text-slate-600 line-clamp-2">
            {condition.physioApproach[0]}
          </p>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(condition.slug)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group-hover:underline"
        >
          <span>Treatment Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={onBook}
          className="text-xs font-semibold text-slate-600 hover:text-[#0f2330] hover:bg-slate-200/60 px-3 py-1.5 rounded-lg transition-colors"
        >
          Book Consult
        </button>
      </div>
    </div>
  );
};
