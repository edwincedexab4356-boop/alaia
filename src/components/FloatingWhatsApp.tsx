import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const FloatingWhatsApp: React.FC = () => {
  const { getWhatsAppLink, config } = useStudio();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <a
        href={getWhatsAppLink('¡Hola ALAIA SKIN STUDIO! Me gustaría consultar sobre la disponibilidad de citas y tratamientos.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a ALAIA SKIN STUDIO"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          Chatear · +507 {config.phone}
        </span>
      </a>
    </div>
  );
};
