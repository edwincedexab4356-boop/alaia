import React from 'react';
import { Instagram, MessageCircle, MapPin, Sliders, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const Footer: React.FC = () => {
  const { config, openAdminDrawer, toggleDekProposal, getWhatsAppLink } = useStudio();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1816] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2C2623] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2C2623]">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.25em] font-light text-white">
                ALAIA
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A69B91] font-medium -mt-1">
                Skin Studio · Obarrio
              </span>
            </div>

            <p className="text-xs text-[#B5A89E] leading-relaxed max-w-sm font-light">
              Centro boutique de spa y cuidado de la piel en Ciudad de Panamá. Dedicado a brindar experiencias de belleza, descanso y atención personalizada.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2A2421] border border-[#3D3530] flex items-center justify-center text-[#D4B8A5] hover:text-white hover:border-[#C5A880] transition-colors"
                aria-label="Perfil de Instagram de ALAIA"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2A2421] border border-[#3D3530] flex items-center justify-center text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp de ALAIA"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <p className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
              Explorar
            </p>
            <ul className="space-y-2 text-xs text-[#C5BCB3]">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#inicio');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#tratamientos"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#tratamientos');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Rituales & Tratamientos
                </a>
              </li>
              <li>
                <a
                  href="#el-estudio"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#el-estudio');
                  }}
                  className="hover:text-white transition-colors"
                >
                  El Estudio
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#galeria');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#faq');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#ubicacion"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#ubicacion');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Ubicación & Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <p className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
              Ubicación & Citas
            </p>
            <div className="space-y-2.5 text-xs text-[#C5BCB3]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: +507 {config.phone}</span>
              </div>
              <div className="pt-2">
                <span className="text-[10px] text-[#A69B91] uppercase tracking-wider block">
                  Atención
                </span>
                <span className="text-white">Lunes a Domingo · Previa Cita</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with D.E.K NOVACORE and Admin Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7E75]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ALAIA SKIN STUDIO. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDekProposal}
              className="inline-flex items-center gap-1.5 text-[#D4B8A5] hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Propuesta D.E.K NOVACORE</span>
            </button>
            <span>•</span>
            <button
              onClick={openAdminDrawer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2421] hover:bg-[#3D3530] text-[#FAF8F5] transition-colors cursor-pointer text-[11px] border border-[#3A322D]"
              title="Panel para la dueña de Alaia"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Acceso Administración</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
