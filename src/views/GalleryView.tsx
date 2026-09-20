import React, { useState } from 'react';
import { GALLERY_ITEMS as FALLBACK_GALLERY } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { GalleryItem } from '../types/clinic';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from 'lucide-react';

interface GalleryViewProps {
  onOpenBooking: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenBooking }) => {
  const { galleryItems: clinicGallery } = useClinic();
  const galleryItems = clinicGallery || FALLBACK_GALLERY;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'clinic', label: 'Treatment Rooms' },
    { id: 'rehab', label: 'Rehab Gym' },
    { id: 'equipment', label: 'Clinical Equipment' },
    { id: 'sessions', label: 'Clinical Care' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleNextLightbox = () => {
    if (!activeLightboxItem) return;
    const currentIdx = filteredItems.findIndex(item => item.id === activeLightboxItem.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIdx]);
  };

  const handlePrevLightbox = () => {
    if (!activeLightboxItem) return;
    const currentIdx = filteredItems.findIndex(item => item.id === activeLightboxItem.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIdx]);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Clinical Environments</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2330] font-heading leading-tight">
              Clinic &amp; Rehabilitation Gallery
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore our modern treatment rooms, private consultation spaces, and fully equipped functional rehabilitation gym floor.
            </p>
          </div>

          {/* Filter tabs */}
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

      {/* Gallery Grid */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || (item as any)._id || `gallery-item-${idx}`}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-4/3 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider font-mono">
                    {item.categoryLabel}
                  </span>
                  <h4 className="text-base font-bold font-heading">{item.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-white/90">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Larger</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxItem(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="max-h-[70vh] flex items-center justify-center bg-black/40 overflow-hidden">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-6 bg-[#0f2330] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-lime-400 font-bold uppercase tracking-wider font-mono">
                  {activeLightboxItem.categoryLabel}
                </span>
                <h3 className="text-xl font-bold font-heading mt-0.5">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {activeLightboxItem.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveLightboxItem(null);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#a3e635] text-[#0f2330] hover:bg-[#8fd622] transition-colors shrink-0"
              >
                Book Appointment
              </button>
            </div>
          </div>

          <button
            onClick={handleNextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
