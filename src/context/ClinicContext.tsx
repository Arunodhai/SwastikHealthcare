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

const EMPTY_CLINIC_SETTINGS: ClinicSettings = {
  name: '',
  tagline: '',
  phone: '',
  phoneRaw: '',
  email: '',
  address: { street: '', suburb: '', city: '', state: '', postcode: '', full: '' },
  openingHours: [],
  whatsappNumber: '',
  whatsappMessage: '',
  howItWorks: [],
};

const ClinicContext = createContext<ClinicContextValue>({
  settings: EMPTY_CLINIC_SETTINGS,
  treatments: [],
  conditions: [],
  teamMembers: [],
  testimonials: [],
  galleryItems: [],
  locations: [],
  customPages: [],
  sanityStatus: defaultStatus,
  isLoading: false,
  refreshSanityData: async () => {},
  seedSanity: async () => {},
});

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ClinicSettings>(EMPTY_CLINIC_SETTINGS);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [locations, setLocations] = useState<ClinicLocationItem[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [sanityStatus, setSanityStatus] = useState<SanityStatus>(defaultStatus);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSanityClinicData();
      setSettings(data.settings || EMPTY_CLINIC_SETTINGS);
      setTreatments(data.treatments || []);
      setConditions(data.conditions || []);
      setTeamMembers(data.teamMembers || []);
      setTestimonials(data.testimonials || []);
      setGalleryItems(data.galleryItems || []);
      setLocations(data.locations || []);
      setCustomPages(data.customPages || []);
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
      .listen(
        '*[_type in ["clinicSettings", "treatment", "condition", "teamMember", "testimonial", "galleryItem", "clinicLocation", "customPage"]]',
        {},
        { visibility: 'query' },
      )
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
