import React from 'react';
import { MapPin, Phone, MessageCircle, Calendar, Instagram, Clock, ExternalLink, Compass } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const LocationSection: React.FC = () => {
  const { config, openBooking, getWhatsAppLink } = useStudio();

  return (
    <section id="ubicacion" className="py-20 sm:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Information Card */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C6D4C]">
                Encuéntranos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C2623] font-light">
                Ubicación & Contacto
              </h2>
              <p className="text-sm text-[#695E56] font-light leading-relaxed">
                Situados en el exclusivo sector de Obarrio, en Ciudad de Panamá. Diseñado como un refugio de tranquilidad de fácil acceso.
              </p>
            </div>

            {/* Details Cards */}
            <div className="space-y-4">
              
              {/* Address */}
              <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#2C2623]">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-serif text-base font-medium">Dirección</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5F554D] leading-relaxed">
                  {config.address}
                </p>
                <div className="pt-1">
                  <a
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C6D4C] hover:text-[#2C2623] font-medium underline underline-offset-2"
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Contact & WhatsApp */}
              <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-[#2C2623]">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-serif text-base font-medium">Atención Telefónica & WhatsApp</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#2C2623]">
                      +507 {config.phone}
                    </p>
                    <p className="text-[11px] text-[#8C7E74]">
                      Consultas, citas y asesoría personalizada
                    </p>
                  </div>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Escribir ahora</span>
                  </a>
                </div>
              </div>

              {/* Schedule */}
              <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#2C2623]">
                    <Clock className="w-4 h-4 text-[#C5A880]" />
                    <span className="font-serif text-base font-medium">Horario de Atención</span>
                  </div>
                  <span className="text-[10px] text-[#8C6D4C] uppercase font-semibold">
                    Lunes a Domingo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#695E56]">
                  {config.schedules.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-[#F5EFEB] text-[11px]">
                      <span className="font-medium text-[#2C2623]">{item.day}:</span>
                      <span className="text-[#8C7E74]">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#8C7E74] italic">
                  * Horarios específicos adaptables según disponibilidad de cabina.
                </p>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C2623] text-white hover:bg-[#433A35] text-xs font-medium tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reservar mi Cita</span>
              </button>

              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#D5C9B8] text-xs font-medium text-[#2C2623] hover:bg-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Instagram Oficial</span>
              </a>
            </div>

          </div>

          {/* Right Column: Stylized Map Card with Twist Tower preview */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5DDD2] shadow-xl space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#F0EAE1]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-serif text-base text-[#2C2623]">
                    PH Twist Tower · Obarrio
                  </span>
                </div>
                <span className="text-[11px] text-[#8C7E74]">
                  Ciudad de Panamá
                </span>
              </div>

              {/* Map Visual Preview Frame */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#EFE8DE] border border-[#E0D7CB]">
                {/* Embed Map representation */}
                <iframe
                  title="Ubicación de ALAIA SKIN STUDIO en PH Twist Tower, Obarrio"
                  src="https://maps.google.com/maps?q=Twist+Tower+Obarrio+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] grayscale-[0.25]"
                  loading="lazy"
                />

                {/* Floating overlay chip */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#E5DDD2] text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="font-serif text-xs font-semibold text-[#2C2623]">ALAIA SKIN STUDIO</p>
                  </div>
                  <p className="text-[10px] text-[#695E56]">PH Twist Tower, Obarrio</p>
                </div>
              </div>

              {/* Map Footer Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs text-[#695E56]">
                <p>
                  Para detalles de llegada, seguridad del edificio y estacionamientos, contáctanos antes de tu sesión.
                </p>
                <a
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#D5C9B8] text-[#2C2623] hover:bg-white shrink-0 font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Cómo llegar</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
