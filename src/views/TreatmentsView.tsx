import React, { useState } from 'react';
import { TREATMENTS as FALLBACK_TREATMENTS } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { TreatmentCard } from '../components/TreatmentCard';
import { Sparkles, Filter } from 'lucide-react';

interface TreatmentsViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (treatmentSlug?: string) => void;
}

export const TreatmentsView: React.FC<TreatmentsViewProps> = ({ onNavigate, onOpenBooking }) => {
  const { treatments: clinicTreatments } = useClinic();
  const treatments = clinicTreatments || FALLBACK_TREATMENTS;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'sports', label: 'Sports & Performance' },
    { id: 'spine', label: 'Spine & Posture' },
    { id: 'rehabilitation', label: 'Rehabilitation' },
    { id: 'manual', label: 'Manual Therapy' },
    { id: 'specialized', label: 'Specialized' },
  ];

  const filteredTreatments = selectedCategory === 'all'
    ? treatments
    : treatments.filter(t => t.category === selectedCategory);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Based Clinical Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2330] font-heading leading-tight">
              Physiotherapy Treatments &amp; Services
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every body is unique. We combine hands-on manual techniques, targeted exercise prescription, and progressive physical loading to deliver measurable recovery.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#0f2330] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment, idx) => (
              <TreatmentCard
                key={treatment.id || (treatment as any)._id || treatment.slug || `treatment-${idx}`}
                treatment={treatment}
                onSelect={(slug) => onNavigate(`/treatments/${slug}`)}
                onBook={(slug) => onOpenBooking(slug)}
              />
            ))}
          </div>

          {filteredTreatments.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-2xl">
              <p className="text-slate-500 text-sm">No treatments currently found under this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
