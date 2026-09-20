import React, { useState } from 'react';
import { CONDITIONS as FALLBACK_CONDITIONS } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { ConditionCard } from '../components/ConditionCard';
import { Activity, Filter } from 'lucide-react';

interface ConditionsViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ConditionsView: React.FC<ConditionsViewProps> = ({ onNavigate, onOpenBooking }) => {
  const { conditions: clinicConditions } = useClinic();
  const conditions = clinicConditions || FALLBACK_CONDITIONS;
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const areas = [
    { id: 'all', label: 'All Conditions' },
    { id: 'spine', label: 'Spine & Neck' },
    { id: 'upper-limb', label: 'Shoulder & Upper Limb' },
    { id: 'lower-limb', label: 'Knee & Lower Limb' },
    { id: 'general', label: 'Sports & Overuse' },
  ];

  const filteredConditions = selectedArea === 'all'
    ? conditions
    : conditions.filter(c => c.bodyArea === selectedArea);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Musculoskeletal Diagnosis &amp; Recovery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2330] font-heading leading-tight">
              Conditions We Treat
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Pain is an alarm signal, not a life sentence. Explore common joint, spinal, and muscular complaints, and learn how targeted physiotherapy restores pain-free movement.
            </p>
          </div>

          {/* Body Area Filters */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1 hidden sm:block" />
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedArea === area.id
                    ? 'bg-[#0f2330] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConditions.map((condition, idx) => (
              <ConditionCard
                key={condition.id || (condition as any)._id || condition.slug || `condition-${idx}`}
                condition={condition}
                onSelect={(slug) => onNavigate(`/conditions/${slug}`)}
                onBook={onOpenBooking}
              />
            ))}
          </div>

          {filteredConditions.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-2xl">
              <p className="text-slate-500 text-sm">No conditions found under this category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Clinical Disclaimer & Consultation CTA */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-xl font-bold text-[#0f2330] font-heading">
            Not sure what is causing your symptoms?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pain patterns often refer from other joints or nerve roots. An initial 45-minute clinical examination with our registered physiotherapists isolates the exact primary driver.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white shadow transition-all"
          >
            Book Comprehensive Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
