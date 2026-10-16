import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const FaqSection: React.FC = () => {
  const { faqs, getWhatsAppLink, config } = useStudio();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F5F1EB] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE2D7] text-[#7A695A] text-[11px] font-medium tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            Dudas Frecuentes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2623] font-light">
            Preguntas frecuentes
          </h2>
          <p className="text-sm text-[#695E56] font-light">
            Información esencial para planificar tu visita y resolver tus consultas sobre nuestros rituales.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E5DDD2] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="font-serif text-base sm:text-lg text-[#2C2623] font-medium">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full border border-[#D5C9B8] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#2C2623] text-white border-[#2C2623]' : 'text-[#8C7E74]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#5F554D] leading-relaxed border-t border-[#F2ECE3] pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct consultation box */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DDD2] text-center space-y-3">
          <p className="font-serif text-lg text-[#2C2623]">
            ¿Tienes alguna consulta no listada aquí?
          </p>
          <p className="text-xs text-[#695E56]">
            Estamos siempre a tu disposición vía WhatsApp para atenderte de forma personalizada.
          </p>
          <div>
            <a
              href={getWhatsAppLink('Hola ALAIA SKIN STUDIO, tengo una consulta específica sobre una cita o servicio.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D5C9B8] hover:bg-[#FAF8F5] text-xs font-medium text-[#2C2623] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Contactar al +507 {config.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
