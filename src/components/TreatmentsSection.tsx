import React, { useState } from 'react';
import { Calendar, Info, Clock, Tag, Sparkles, MessageCircle } from 'lucide-react';
import { Treatment, ServiceCategory } from '../types';
import { useStudio } from '../context/StudioContext';
import { TreatmentDetailModal } from './TreatmentDetailModal';

export const TreatmentsSection: React.FC = () => {
  const { treatments, openBooking, openTreatmentDetail, selectedTreatmentForDetail, closeTreatmentDetail, getWhatsAppLink, config } = useStudio();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'todos', label: 'Todos los Rituales' },
    { id: 'faciales', label: 'Faciales & Skincare' },
    { id: 'peeling', label: 'Peeling Renovador' },
    { id: 'cosmetologia', label: 'Cosmiatría' },
    { id: 'maderoterapia', label: 'Maderoterapia' },
    { id: 'masajes', label: 'Masajes Reductores' },
  ];

  const filteredTreatments = activeCategory === 'todos'
    ? treatments
    : treatments.filter((t) => t.category === activeCategory);

  return (
    <section id="tratamientos" className="py-20 sm:py-28 bg-[#F5F1EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE2D7] text-[#7A695A] text-[11px] font-medium tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            Experiencias de cabina
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C2623] font-light">
            Rituales de belleza y bienestar
          </h2>

          <p className="text-sm sm:text-base text-[#695E56] font-light leading-relaxed">
            Cada protocolo en ALAIA SKIN STUDIO ha sido seleccionado para respetar la armonía natural de tu piel y brindarte un instante de serenidad en Obarrio.
          </p>

          {/* Category Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer font-medium ${
                  activeCategory === cat.id
                    ? 'bg-[#2C2623] text-[#FAF8F5] shadow-xs'
                    : 'bg-white/80 text-[#695E56] hover:bg-white hover:text-[#2C2623] border border-[#E5DDD2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment: Treatment) => (
            <article
              key={treatment.id}
              className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E5DDD2] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 w-full bg-[#EAE2D8] overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                
                {/* Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-semibold tracking-wider uppercase text-[#55473E]">
                    {treatment.category}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{treatment.duration || 'Duración a consultar'}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2C2623] font-normal mb-2 group-hover:text-[#8C6D4C] transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#695E56] leading-relaxed line-clamp-3">
                    {treatment.shortDescription}
                  </p>
                </div>

                {/* Meta details & Pending Note */}
                <div className="pt-3 border-t border-[#EFE9DF] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8C7E74] flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#C5A880]" />
                      Tarifa:
                    </span>
                    {treatment.showPrice && treatment.price ? (
                      <span className="font-semibold text-[#2C2623]">{treatment.price}</span>
                    ) : (
                      <span className="text-[11px] text-[#8C6D4C] bg-[#F4EDE5] px-2 py-0.5 rounded-full">
                        Tarifa por consultar
                      </span>
                    )}
                  </div>

                  {!treatment.isConfirmedByOwner && (
                    <p className="text-[10px] text-[#A69B91] italic">
                      * Ficha base para validación de la propietaria
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openTreatmentDetail(treatment)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#2C2623] hover:bg-white hover:border-[#BFAF9F] transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-[#8C7E74]" />
                    <span>Detalles</span>
                  </button>

                  <button
                    onClick={() => openBooking(treatment.id)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2C2623] hover:bg-[#433A35] text-white text-xs font-medium tracking-wide uppercase transition-all shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Reservar</span>
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Bottom consultation prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DDD2] text-center max-w-3xl mx-auto space-y-3 shadow-xs">
          <h4 className="font-serif text-xl sm:text-2xl text-[#2C2623]">
            ¿Tienes dudas sobre qué tratamiento es el adecuado para tu piel?
          </h4>
          <p className="text-xs sm:text-sm text-[#695E56] max-w-xl mx-auto">
            Escríbenos directamente a nuestro WhatsApp oficial y con gusto te orientaremos de forma personalizada según tus objetivos dérmicos.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppLink('Hola ALAIA SKIN STUDIO, me gustaría recibir asesoría para saber qué tratamiento se adapta mejor a mi cutis.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-medium tracking-wide shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear con ALAIA (+507 {config.phone})</span>
            </a>
          </div>
        </div>

      </div>

      {/* Treatment Detail Modal */}
      {selectedTreatmentForDetail && (
        <TreatmentDetailModal
          treatment={selectedTreatmentForDetail}
          onClose={closeTreatmentDetail}
          onBook={(id) => openBooking(id)}
        />
      )}
    </section>
  );
};
