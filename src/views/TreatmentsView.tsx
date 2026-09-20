import React, { useState } from 'react';
import { TREATMENTS as FALLBACK_TREATMENTS } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { TreatmentCard } from '../components/TreatmentCard';
import { Sparkles, Filter } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { getManagedPage, getManagedSection } from '../data/pageContent';

interface TreatmentsViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (treatmentSlug?: string) => void;
}

export const TreatmentsView: React.FC<TreatmentsViewProps> = ({ onNavigate, onOpenBooking }) => {
  const { treatments: clinicTreatments, settings } = useClinic();
  const treatments = clinicTreatments || FALLBACK_TREATMENTS;
  const page = getManagedPage(settings, 'treatments');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = (page.filters || []).map((item) => ({ id: item.key, label: item.label || item.key }));
  const emptySection = getManagedSection(page, 'empty');

  const filteredTreatments = selectedCategory === 'all'
    ? treatments
    : treatments.filter(t => t.category === selectedCategory);

  return (
    <div className="bg-white">
      <PageHero
        imageSrc={page.heroImageUrl || ''}
        imageAlt={page.heroImageAlt || ''}
        badge={(
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{page.heroBadge}</span>
          </div>
        )}
        title={page.heroTitle}
        description={page.heroDescription}
      >
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
      </PageHero>

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
              <p className="text-slate-500 text-sm">{emptySection?.description}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
