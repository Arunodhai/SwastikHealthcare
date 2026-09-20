import React from 'react';
import { CustomPage } from '../types/clinic';
import { Calendar, ArrowRight, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

interface CustomPageViewProps {
  page: CustomPage;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const CustomPageView: React.FC<CustomPageViewProps> = ({ page, onNavigate, onOpenBooking }) => {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[250px]">{page.title}</span>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-emerald-700 font-bold hover:underline hidden sm:inline-block"
          >
            Book Appointment &rarr;
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 lg:py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {page.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{page.badge}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2330] font-heading leading-tight">
              {page.title}
            </h1>

            {page.leadText && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {page.leadText}
              </p>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#0f2330]" />
                <span>Book Consultation</span>
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-white hover:bg-slate-50 text-[#0f2330] border border-slate-300 transition-all flex items-center gap-2"
              >
                <span>Contact Clinic</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {page.bannerImage && (
            <div className="mt-10 rounded-3xl overflow-hidden shadow-xl border border-slate-200 max-h-96">
              <img
                src={page.bannerImage}
                alt={page.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Sections */}
      {page.sections && page.sections.length > 0 && (
        <section className="py-16 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {page.sections.map((section, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-slate-50/60 border border-slate-200/90 space-y-6"
              >
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f2330] font-heading tracking-tight">
                    {section.heading}
                  </h2>
                )}

                {section.content && (
                  <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                    {section.content}
                  </div>
                )}

                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {section.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-slate-800 font-medium leading-relaxed">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {section.callToActionText && (
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        if (section.callToActionLink?.startsWith('/')) {
                          onNavigate(section.callToActionLink);
                        } else {
                          onOpenBooking();
                        }
                      }}
                      className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white shadow transition-all inline-flex items-center gap-2"
                    >
                      <span>{section.callToActionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pre-footer Consultation Banner */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-heading">
            Need tailored clinical guidance?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Our experienced team is here to answer your questions and create a personalized plan for your recovery.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] transition-all"
            >
              Book Initial Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
