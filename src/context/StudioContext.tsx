import React, { createContext, useContext, useState, useEffect } from 'react';
import { Treatment, StudioConfig, Booking, GalleryItem, FaqItem } from '../types';
import {
  INITIAL_STUDIO_CONFIG,
  INITIAL_TREATMENTS,
  INITIAL_GALLERY,
  INITIAL_FAQS,
  INITIAL_DEMO_BOOKINGS,
} from '../data/initialData';

interface StudioContextType {
  config: StudioConfig;
  treatments: Treatment[];
  bookings: Booking[];
  gallery: GalleryItem[];
  faqs: FaqItem[];
  
  // Modals & Drawers
  isBookingOpen: boolean;
  preselectedTreatmentId: string | null;
  selectedTreatmentForDetail: Treatment | null;
  isAdminDrawerOpen: boolean;
  isDekProposalOpen: boolean;

  // Actions
  openBooking: (treatmentId?: string) => void;
  closeBooking: () => void;
  openTreatmentDetail: (treatment: Treatment) => void;
  closeTreatmentDetail: () => void;
  openAdminDrawer: () => void;
  closeAdminDrawer: () => void;
  toggleDekProposal: () => void;

  // Data mutations
  addBooking: (booking: Omit<Booking, 'id' | 'code' | 'createdAt' | 'status' | 'isDemo'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updateStudioConfig: (config: StudioConfig) => void;
  updateTreatment: (treatment: Treatment) => void;
  addTreatment: (treatment: Omit<Treatment, 'id'>) => void;
  resetToDefaults: () => void;

  // Utilities
  getWhatsAppLink: (customMessage?: string) => string;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'alaia_studio_config_v1',
  TREATMENTS: 'alaia_treatments_v1',
  BOOKINGS: 'alaia_bookings_v1',
};

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<StudioConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : INITIAL_STUDIO_CONFIG;
    } catch {
      return INITIAL_STUDIO_CONFIG;
    }
  });

  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TREATMENTS);
      return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
    } catch {
      return INITIAL_TREATMENTS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [faqs] = useState<FaqItem[]>(INITIAL_FAQS);

  // UI state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedTreatmentId, setPreselectedTreatmentId] = useState<string | null>(null);
  const [selectedTreatmentForDetail, setSelectedTreatmentForDetail] = useState<Treatment | null>(null);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [isDekProposalOpen, setIsDekProposalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(treatments));
    } catch (e) {
      console.error('Failed to save treatments', e);
    }
  }, [treatments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings', e);
    }
  }, [bookings]);

  const openBooking = (treatmentId?: string) => {
    setPreselectedTreatmentId(treatmentId || null);
    setIsBookingOpen(true);
    if (selectedTreatmentForDetail) {
      setSelectedTreatmentForDetail(null);
    }
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setPreselectedTreatmentId(null);
  };

  const openTreatmentDetail = (treatment: Treatment) => {
    setSelectedTreatmentForDetail(treatment);
  };

  const closeTreatmentDetail = () => {
    setSelectedTreatmentForDetail(null);
  };

  const openAdminDrawer = () => setIsAdminDrawerOpen(true);
  const closeAdminDrawer = () => setIsAdminDrawerOpen(false);
  const toggleDekProposal = () => setIsDekProposalOpen((prev) => !prev);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'code' | 'createdAt' | 'status' | 'isDemo'>): Booking => {
    const randomCode = `AL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      code: randomCode,
      createdAt: new Date().toISOString(),
      status: 'pendiente',
      isDemo: true,
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const updateStudioConfig = (newConfig: StudioConfig) => {
    setConfig(newConfig);
  };

  const updateTreatment = (updated: Treatment) => {
    setTreatments((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const addTreatment = (treatmentData: Omit<Treatment, 'id'>) => {
    const newId = `treat-${Date.now()}`;
    setTreatments((prev) => [...prev, { ...treatmentData, id: newId }]);
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_STUDIO_CONFIG);
    setTreatments(INITIAL_TREATMENTS);
    setBookings(INITIAL_DEMO_BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.TREATMENTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  };

  const getWhatsAppLink = (customMessage?: string): string => {
    const cleanNumber = config.whatsappNumber.replace(/\D/g, '') || '50763022267';
    const text = customMessage
      ? encodeURIComponent(customMessage)
      : encodeURIComponent('¡Hola ALAIA SKIN STUDIO! Me gustaría consultar sobre sus servicios de spa y cuidado de la piel en Obarrio.');
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  return (
    <StudioContext.Provider
      value={{
        config,
        treatments,
        bookings,
        gallery,
        faqs,
        isBookingOpen,
        preselectedTreatmentId,
        selectedTreatmentForDetail,
        isAdminDrawerOpen,
        isDekProposalOpen,
        openBooking,
        closeBooking,
        openTreatmentDetail,
        closeTreatmentDetail,
        openAdminDrawer,
        closeAdminDrawer,
        toggleDekProposal,
        addBooking,
        updateBookingStatus,
        updateStudioConfig,
        updateTreatment,
        addTreatment,
        resetToDefaults,
        getWhatsAppLink,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
