export type ServiceCategory = 'todos' | 'faciales' | 'peeling' | 'cosmetologia' | 'maderoterapia' | 'masajes';

export interface Treatment {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  duration: string; // e.g. "60 min" or "Por consultar"
  price: string; // e.g. "$65" or "" (hidden/por consultar)
  showPrice: boolean;
  image: string;
  benefits: string[];
  recommendations: string;
  isConfirmedByOwner: boolean; // Flag to show if verified or pending confirmation
}

export interface Booking {
  id: string;
  code: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
  status: 'pendiente' | 'confirmada' | 'atendida' | 'cancelada';
  createdAt: string;
  isDemo: boolean;
}

export interface DaySchedule {
  day: string;
  isOpen: boolean;
  hours: string;
}

export interface StudioConfig {
  studioName: string;
  tagline: string;
  phone: string; // "63022267"
  whatsappNumber: string; // "50763022267"
  address: string; // "PH Twist Tower, Obarrio, Ciudad de Panamá, Panamá"
  googleMapsUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  heroHeadline: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  schedules: DaySchedule[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cabinas' | 'rituales' | 'texturas' | 'bienestar';
  imageUrl: string;
  caption: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
