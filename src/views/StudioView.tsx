import React, { Suspense } from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';

interface StudioViewProps {
  onNavigate: (path: string) => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ onNavigate }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100">
      {/* Studio Header Quick Bar */}
      <div className="h-11 bg-[#101112] border-b border-[#222429] px-4 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 font-bold text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-md transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Website</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Swastik Healthcare CMS Studio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://manage.sanity.io/projects/41uk25bi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors text-[11px]"
          >
            <span>Sanity Dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Embedded Sanity Studio */}
      <div className="flex-1 w-full h-[calc(100vh-44px)] overflow-hidden relative">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#101112] text-slate-400 space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
              <p className="text-sm font-medium">Loading Sanity Studio...</p>
            </div>
          }
        >
          <Studio config={config} />
        </Suspense>
      </div>
    </div>
  );
};
