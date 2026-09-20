import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Treatment,
  Condition,
  TeamMember,
  Testimonial,
  GalleryItem,
  ClinicSettings,
  ClinicLocationItem,
  CustomPage
} from '../types/clinic';
import {
  CLINIC_SETTINGS as DEFAULT_CLINIC_SETTINGS,
  TREATMENTS as DEFAULT_TREATMENTS,
  CONDITIONS as DEFAULT_CONDITIONS,
  TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS,
  CLINIC_LOCATIONS as DEFAULT_CLINIC_LOCATIONS
} from '../data/clinicData';
import { 
  fetchSanityClinicData, 
  sanityClient,
  seedSanityDataset, 
  SanityStatus, 
  SANITY_PROJECT_ID, 
  SANITY_DATASET 
} from '../lib/sanity';

interface ClinicContextValue {
  settings: ClinicSettings;
  treatments: Treatment[];
  conditions: Condition[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
  locations: ClinicLocationItem[];
  customPages: CustomPage[];
  sanityStatus: SanityStatus;
  isLoading: boolean;
  refreshSanityData: () => Promise<void>;
  seedSanity: (token: string) => Promise<any>;
}

const defaultStatus: SanityStatus = {
  connected: false,
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  isUsingFallback: true,
  hasCustomContent: false,
  totalSanityDocs: 0,
  itemCounts: {
    treatments: 0,
    conditions: 0,
    team: 0,
    testimonials: 0,
    gallery: 0,
    locations: 0,
    customPages: 0,
  },
  lastChecked: null,
  error: null,
};

const ClinicContext = createContext<ClinicContextValue>({
  settings: DEFAULT_CLINIC_SETTINGS,
  treatments: DEFAULT_TREATMENTS,
  conditions: DEFAULT_CONDITIONS,
  teamMembers: DEFAULT_TEAM_MEMBERS,
  testimonials: DEFAULT_TESTIMONIALS,
  galleryItems: DEFAULT_GALLERY_ITEMS,
  locations: DEFAULT_CLINIC_LOCATIONS,
  customPages: [],
  sanityStatus: defaultStatus,
  isLoading: false,
  refreshSanityData: async () => {},
  seedSanity: async () => {},
});

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ClinicSettings>(DEFAULT_CLINIC_SETTINGS);
  const [treatments, setTreatments] = useState<Treatment[]>(DEFAULT_TREATMENTS);
  const [conditions, setConditions] = useState<Condition[]>(DEFAULT_CONDITIONS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);
  const [locations, setLocations] = useState<ClinicLocationItem[]>(DEFAULT_CLINIC_LOCATIONS);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [sanityStatus, setSanityStatus] = useState<SanityStatus>(defaultStatus);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSanityClinicData();
      setSettings(data.settings);
      setTreatments(data.treatments);
      setConditions(data.conditions);
      setTeamMembers(data.teamMembers);
      setTestimonials(data.testimonials);
      setGalleryItems(data.galleryItems);
      setLocations(data.locations);
      setCustomPages(data.customPages);
      setSanityStatus(data.status);
    } catch {
      // Retain robust default values
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedSanity = async (token: string) => {
    const res = await seedSanityDataset(token);
    await loadData();
    return res;
  };

  useEffect(() => {
    loadData();

    const subscription = sanityClient
      .listen('*[_id == "clinicSettings-singleton"]', {}, { visibility: 'query' })
      .subscribe({
        next: () => loadData(),
        error: () => {
          // The initial fetch remains authoritative if realtime is unavailable.
        },
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ClinicContext.Provider
      value={{
        settings,
        treatments,
        conditions,
        teamMembers,
        testimonials,
        galleryItems,
        locations,
        customPages,
        sanityStatus,
        isLoading,
        refreshSanityData: loadData,
        seedSanity: handleSeedSanity,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
}
