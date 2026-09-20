import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const WhatsAppButton: React.FC = () => {
  const { settings: clinicSettings } = useClinic();
  const settings = clinicSettings;
  const copy = settings.uiCopy || {};
  const [showTooltip, setShowTooltip] = useState(false);

  // Sanitized phone number for WhatsApp link (digits only)
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappMessage || '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  if (!cleanPhone) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
      {/* Optional helper balloon on hover or desktop tap */}
      {showTooltip && (
        <div className="mb-2 max-w-xs bg-white text-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 text-xs pointer-events-auto transition-all animate-in fade-in duration-200 relative">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close message"
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            {copy.whatsappTooltipTitle}
          </div>
          <p className="text-slate-600">
            {copy.whatsappTooltipText}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline"
          >
            {copy.whatsappCtaLabel} &rarr;
          </a>
        </div>
      )}

      {/* Main floating pill button */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="pointer-events-auto group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat with clinic on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current text-white" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
          {copy.whatsappButtonLabel}
        </span>
      </a>
    </div>
  );
};
