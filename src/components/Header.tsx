import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Menu, X, ChevronRight } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ClinicBrand } from './SwastikLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (treatmentSlug?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenBooking }) => {
  const { settings: clinicSettings, customPages } = useClinic();
  const settings = clinicSettings;
  const copy = settings.uiCopy || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseNavItems = [
    { label: copy.navHomeLabel, path: '/' },
    { label: copy.navAboutLabel, path: '/about' },
    { label: copy.navTreatmentsLabel, path: '/treatments' },
    { label: copy.navConditionsLabel, path: '/conditions' },
    { label: copy.navGalleryLabel, path: '/gallery' },
    { label: copy.navContactLabel, path: '/contact' },
  ].filter((item): item is { label: string; path: string } => Boolean(item.label));

  // Merge any dynamically created Sanity pages marked for top navigation
  const dynamicNavItems = (customPages || [])
    .filter((p) => p.showInNav)
    .map((p) => ({
      label: p.title,
      path: `/pages/${p.slug}`,
    }));

  const navItems = [...baseNavItems, ...dynamicNavItems];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 relative isolate overflow-hidden transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[linear-gradient(110deg,rgba(217,249,157,0.94)_0%,rgba(163,230,53,0.92)_48%,rgba(110,231,183,0.90)_100%)] backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_30px_-8px_rgba(11,35,65,0.22)] border-b border-white/45 py-2.5 sm:py-3'
            : 'bg-[linear-gradient(110deg,#d9f99d_0%,#a3e635_48%,#6ee7b7_100%)] border-b border-white/55 shadow-[0_4px_16px_-6px_rgba(11,35,65,0.2)] py-3 sm:py-3.5'
        }`}
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_-90%,rgba(255,255,255,0.95),transparent_43%),radial-gradient(circle_at_88%_180%,rgba(13,148,136,0.22),transparent_42%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px -z-10 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            {/* Swastik Healthcare Brand Lockup & Circular Emblem */}
            <ClinicBrand
              name={settings.name}
              tagline={settings.tagline}
              theme="lime"
              onClick={() => handleLinkClick('/')}
              size="md"
              className="py-0.5"
              emblemClassName="w-10 h-10 sm:w-11 sm:h-11 ring-2 ring-white/80 bg-white rounded-full shadow-xs shrink-0"
            />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(item.path);

                return (
                  <button
                    key={item.path}
                    id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleLinkClick(item.path)}
                    className={`relative rounded-full px-2.5 py-1.5 text-[14px] transition-all duration-200 ${
                      isActive
                        ? 'text-[#0b2341] font-bold bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]'
                        : 'text-[#0b2341]/80 hover:text-[#0b2341] hover:bg-white/25 font-semibold'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#0b2341] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Book Appointment CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                id="header-book-appointment-btn"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0b2341] hover:bg-[#071927] text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-white/10 ring-1 ring-black/10"
              >
                <Calendar className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>{copy.headerBookingLabel}</span>
              </button>
            </div>

            {/* Mobile menu hamburger button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="mobile-quick-book-btn"
                onClick={() => onOpenBooking()}
                className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0b2341] hover:bg-[#071927] text-white shadow-xs active:scale-95 transition-all"
              >
                {copy.headerMobileBookingLabel}
              </button>

              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-full text-[#0b2341] hover:bg-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#0b2341]/40 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <ClinicBrand
                name={settings.name}
                tagline={settings.tagline}
                onClick={() => handleLinkClick('/')}
                size="sm"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 py-6 space-y-1.5">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-[#0f2330] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </nav>

            {/* Direct Booking & Clinic details in mobile drawer */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <button
                id="drawer-book-appointment-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm bg-[#a3e635] text-[#0f2330] shadow flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <Calendar className="w-4 h-4" />
                <span>{copy.headerBookingLabel}</span>
              </button>

              <a
                href={`tel:${settings.phoneRaw}`}
                className="w-full py-3 px-4 rounded-xl text-center font-semibold text-sm border border-slate-200 text-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call {settings.phone}</span>
              </a>

              <div className="text-center text-xs text-slate-500 pt-2">
                <p>{settings.address?.full}</p>
                {copy.mobileRebateNote && <p className="text-emerald-700 font-medium mt-1">{copy.mobileRebateNote}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
