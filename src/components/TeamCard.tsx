import React from 'react';
import { Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { TeamMember } from '../types/clinic';

interface TeamCardProps {
  member: TeamMember;
  onSelect?: () => void;
  onBook?: () => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, onBook }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group">
      {/* Photo Container */}
      <div className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        {/* Member tags overlay */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>AHPRA Registered</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h4 className="text-xl font-bold font-heading leading-tight">
            {member.name}
          </h4>
          <p className="text-xs text-lime-300 font-medium mt-0.5">
            {member.title}
          </p>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate">{member.qualifications}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {member.bio}
          </p>

          {/* Specialization pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {member.specialization.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            {member.experienceYears}+ Years Clinical Exp.
          </span>
          <button
            onClick={onBook}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Book with {member.name.split(' ')[0]}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
