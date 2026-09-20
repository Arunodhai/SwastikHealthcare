import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types/clinic';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
      {/* 5 Golden Stars */}
      <div>
        <div className="flex items-center gap-1 text-amber-400 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
          "{testimonial.review}"
        </blockquote>
      </div>

      {/* Patient info */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/20"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#0f2330] text-white flex items-center justify-center font-bold text-sm">
            {testimonial.name[0]}
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-[#0f2330] font-heading flex items-center gap-1.5">
            <span>{testimonial.name}</span>
            {testimonial.verified && (
              <span className="text-emerald-600 inline-flex items-center" title="Verified Clinic Patient">
                <CheckCircle className="w-3.5 h-3.5 fill-current" />
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-500">
            {testimonial.conditionTreated}
          </p>
        </div>
      </div>
    </div>
  );
};
