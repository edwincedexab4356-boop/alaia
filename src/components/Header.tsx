import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MessageCircle, MapPin } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const Header: React.FC = () => {
  const { openBooking, config, getWhatsAppLink } = useStudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Tratamientos', href: '#tratamientos' },
    { name: 'El Estudio', href: '#el-estudio' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Preguntas', href: '#faq' },
    { name: 'Ubicación', href: '#ubicacion' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE3D8] shadow-xs py-3'
          : 'bg-[#FAF8F5]/80 backdrop-blur-xs border-b border-[#F0EAE1] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="group flex flex-col focus:outline-hidden"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-light text-[#2C2623] group-hover:text-[#8C6D4C] transition-colors">
              ALAIA
            </span>
            <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-[#8C7E74] -mt-1 font-medium">
              Skin Studio · Obarrio
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs uppercase tracking-[0.16em] text-[#554C45] hover:text-[#2C2623] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Quick Actions (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-[#554C45] hover:text-[#2C2623] transition-colors rounded-full hover:bg-[#F2ECE3]"
              title="Escribir por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="font-medium">{config.phone}</span>
            </a>

            <button
              onClick={() => openBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2C2623] text-[#FAF8F5] hover:bg-[#433A35] transition-all text-xs font-medium tracking-wider uppercase shadow-xs hover:shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Reservar Cita</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => openBooking()}
              className="px-3 py-1.5 rounded-full bg-[#2C2623] text-white text-[11px] font-medium tracking-wider uppercase cursor-pointer"
            >
              Reservar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2C2623] rounded-lg hover:bg-[#F0EAE1] focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bg-[#FAF8F5] border-b border-[#E5DDD2] shadow-xl px-6 py-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            <div className="text-[10px] tracking-widest uppercase text-[#8C7E74] font-medium border-b border-[#EFEAE3] pb-1">
              Navegación
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-[#2C2623] hover:text-[#C5A880] py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-[#EFEAE3] space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#695E56]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span className="truncate">{config.address}</span>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#DCD3C7] text-xs font-medium text-[#2C2623] hover:bg-[#F3EDE5] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: +507 {config.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2C2623] text-white text-xs font-medium tracking-wider uppercase shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Reservar mi Cita</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
