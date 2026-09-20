import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { ConditionCard } from '../components/ConditionCard';
import { Activity, Filter } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { getManagedPage, getManagedSection } from '../data/pageContent';

interface ConditionsViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ConditionsView: React.FC<ConditionsViewProps> = ({ onNavigate, onOpenBooking }) => {
  const { conditions: clinicConditions, settings } = useClinic();
  const conditions = clinicConditions;
  const page = getManagedPage(settings, 'conditions');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const areas = (page.filters || []).map((item) => ({ id: item.key, label: item.label || item.key }));
  const emptySection = getManagedSection(page, 'empty');
  const consultationSection = getManagedSection(page, 'consultation');

  const filteredConditions = selectedArea === 'all'
    ? conditions
    : conditions.filter(c => c.bodyArea === selectedArea);

  return (
    <div className="bg-white">
      <PageHero
        imageSrc={page.heroImageUrl || ''}
        imageAlt={page.heroImageAlt || ''}
        badge={(
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800">
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            <span>{page.heroBadge}</span>
          </div>
        )}
        title={page.heroTitle}
        description={page.heroDescription}
      >
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
      </PageHero>

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
              <p className="text-slate-500 text-sm">{emptySection?.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* Clinical Disclaimer & Consultation CTA */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-xl font-bold text-[#0f2330] font-heading">
            {consultationSection?.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {consultationSection?.description}
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white shadow transition-all"
          >
            {consultationSection?.ctaLabel}
          </button>
        </div>
      </section>
    </div>
  );
};
