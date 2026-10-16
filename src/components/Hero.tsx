import React from 'react';
import { Calendar, ArrowDown, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const Hero: React.FC = () => {
  const { openBooking, config, getWhatsAppLink } = useStudio();

  const scrollToTreatments = () => {
    const el = document.getElementById('tratamientos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center bg-[#FAF8F5] overflow-hidden pt-6 pb-16 sm:py-20 lg:py-28">
      {/* Subtle organic background gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F3EAE2] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#EFE8DF] blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Location & studio badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EDE5] border border-[#E5DDD2] text-[#63554A]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] sm:text-xs font-medium tracking-wider uppercase">
                Obarrio · Ciudad de Panamá
              </span>
              <span className="text-[#C5BCB3]">•</span>
              <span className="text-[11px] sm:text-xs text-[#8C7E74]">PH Twist Tower</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-tight text-[#2C2623] font-light">
              Tu piel merece un{' '}
              <span className="italic font-normal text-[#8A6B4E] block sm:inline">
                cuidado extraordinario.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#5F554D] max-w-xl font-light leading-relaxed">
              {config.heroSubtitle}
            </p>

            {/* Call to actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#2C2623] hover:bg-[#433A35] text-[#FAF8F5] transition-all text-xs sm:text-sm font-medium tracking-widest uppercase shadow-md hover:shadow-lg cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                <span>Reservar mi cita</span>
              </button>

              <button
                onClick={scrollToTreatments}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/80 hover:bg-white text-[#2C2623] border border-[#DCD3C7] hover:border-[#BFAF9F] transition-all text-xs sm:text-sm font-medium tracking-wider uppercase cursor-pointer"
              >
                <span>Descubrir tratamientos</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8C7E74]" />
              </button>
            </div>

            {/* Trust and personalized highlights */}
            <div className="pt-6 border-t border-[#EAE3D9] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-xs text-[#695E56]">
              <div>
                <p className="font-serif text-lg text-[#2C2623] font-normal">Atención 1 a 1</p>
                <p className="text-[11px] text-[#8C7E74] mt-0.5">Diagnóstico y trato exclusivo</p>
              </div>
              <div>
                <p className="font-serif text-lg text-[#2C2623] font-normal">Lunes a Domingo</p>
                <p className="text-[11px] text-[#8C7E74] mt-0.5">Horarios bajo previa cita</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#2C2623] hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span className="font-serif text-base">+507 {config.phone}</span>
                </a>
                <p className="text-[11px] text-[#8C7E74] mt-0.5">Consultas directas en WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#F2EDE7]">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85"
                  alt="Tratamiento facial sereno y cuidado de la piel en ALAIA SKIN STUDIO"
                  className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating caption badge inside frame */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/90 backdrop-blur-md rounded-xl border border-white/40 text-left shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#8C7E74] font-medium">Experiencia Facial</p>
                      <p className="font-serif text-sm font-medium text-[#2C2623]">Piel luminosa, equilibrada y descansada</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#F4EDE5] text-[#8C6D4C] text-[10px] font-medium">
                      Obarrio
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary floating element */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-[#FAF8F5] p-3.5 sm:p-4 rounded-xl border border-[#E5DDD2] shadow-xl max-w-[200px] sm:max-w-[230px] hidden sm:block text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#2C2623]">
                    Rituales Exclusivos
                  </span>
                </div>
                <p className="text-[11px] text-[#695E56] leading-snug">
                  Faciales, Peeling, Maderoterapia y Cosmiatría en Twist Tower.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
