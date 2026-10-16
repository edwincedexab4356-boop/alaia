import React from 'react';
import { X, Calendar, MessageCircle, Clock, Tag, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Treatment } from '../types';
import { useStudio } from '../context/StudioContext';

interface Props {
  treatment: Treatment;
  onClose: () => void;
  onBook: (treatmentId: string) => void;
}

export const TreatmentDetailModal: React.FC<Props> = ({ treatment, onClose, onBook }) => {
  const { getWhatsAppLink, config } = useStudio();

  const whatsappMessage = `Hola ALAIA SKIN STUDIO, me gustaría solicitar información detallada sobre el tratamiento: ${treatment.name}. ¿Podrían orientarme sobre disponibilidad y recomendaciones?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] text-[#2C2623] max-w-2xl w-full rounded-2xl shadow-2xl border border-[#E5DDD2] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header Image & Close */}
        <div className="relative h-56 sm:h-64 w-full bg-[#EAE2D8] shrink-0">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
            aria-label="Cerrar detalles"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C5A880]/90 text-[#2C2623] text-[10px] uppercase tracking-wider font-semibold mb-1.5">
              {treatment.category.toUpperCase()}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-xs">
              {treatment.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DDD2] text-xs text-[#554C45]">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Duración estimada: <strong>{treatment.duration || 'A coordinar'}</strong></span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DDD2] text-xs text-[#554C45]">
              <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>
                Precio:{' '}
                {treatment.showPrice && treatment.price ? (
                  <strong className="text-[#2C2623]">{treatment.price}</strong>
                ) : (
                  <em className="text-[#8C7E74]">Consultar tarifa al estudio</em>
                )}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2C2623] mb-2">
              Acerca de este tratamiento
            </h3>
            <p className="text-sm text-[#5F554D] leading-relaxed">
              {treatment.fullDescription}
            </p>
          </div>

          {/* Benefits */}
          {treatment.benefits && treatment.benefits.length > 0 && (
            <div>
              <h3 className="font-serif text-lg font-medium text-[#2C2623] mb-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>Beneficios clave</span>
              </h3>
              <ul className="space-y-2">
                {treatment.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#5F554D]">
                    <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {treatment.recommendations && (
            <div className="p-4 rounded-xl bg-[#F6EFE9] border border-[#E8DAD0] text-xs text-[#5C4F46] space-y-1">
              <span className="font-medium text-[#2C2623] block">
                Recomendaciones para tu cita:
              </span>
              <p>{treatment.recommendations}</p>
            </div>
          )}

          {/* Disclaimer for demo */}
          {!treatment.isConfirmedByOwner && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FAF4ED] border border-[#EBD9C8] text-[11px] text-[#7A6B5F]">
              <AlertCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>
                Ficha de demostración comercial D.E.K NOVACORE. Los tiempos, contraindicaciones específicas y protocolos finales serán ajustados por la propietaria de ALAIA SKIN STUDIO.
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 bg-[#F4EFEA] border-t border-[#E5DDD2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#D5C9B8] text-[#2C2623] hover:bg-white text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Consultar por WhatsApp (+507 {config.phone})</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onBook(treatment.id);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2C2623] hover:bg-[#433A35] text-white text-xs font-medium tracking-wider uppercase shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span>Reservar este ritual</span>
          </button>
        </div>

      </div>
    </div>
  );
};
