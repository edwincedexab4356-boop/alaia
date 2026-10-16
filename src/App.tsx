/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudioProvider } from './context/StudioContext';
import { DekCommercialBanner } from './components/DekCommercialBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TreatmentsSection } from './components/TreatmentsSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { InstagramSection } from './components/InstagramSection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <StudioProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] flex flex-col font-sans selection:bg-[#EEDFD6] selection:text-[#2C2623]">
        {/* Commercial Presentation Banner for D.E.K NOVACORE */}
        <DekCommercialBanner />

        {/* Navigation Header */}
        <Header />

        {/* Main Sections */}
        <main className="flex-1">
          <Hero />
          <TreatmentsSection />
          <AboutSection />
          <GallerySection />
          <InstagramSection />
          <FaqSection />
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Overlays, Drawers & Modals */}
        <BookingModal />
        <AdminPanel />
        <FloatingWhatsApp />
      </div>
    </StudioProvider>
  );
}
