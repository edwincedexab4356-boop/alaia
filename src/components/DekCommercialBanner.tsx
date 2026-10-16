import React, { useState } from 'react';
import { Sparkles, Sliders, ChevronDown, ChevronUp, CheckCircle, Smartphone, Calendar, ShieldCheck, X } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const DekCommercialBanner: React.FC = () => {
  const { openAdminDrawer, isDekProposalOpen, toggleDekProposal, config } = useStudio();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Top Bar Banner */}
      <aside aria-label="Demostración comercial D.E.K NOVACORE" className="bg-[#231E1B] text-[#FAF8F5] border-b border-[#3A322D] text-xs transition-all relative z-40">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#D4B8A5] font-medium tracking-wider uppercase text-[10px]">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Propuesta D.E.K NOVACORE
            </span>
            <span className="hidden sm:inline text-[#C5BCB3]">
              Demostración comercial exclusiva para la propietaria de <strong className="text-white font-normal">ALAIA SKIN STUDIO</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDekProposal}
              className="text-[#D4B8A5] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Objetivos de la propuesta
            </button>
            <span className="text-[#4E443E]">•</span>
            <button
              onClick={openAdminDrawer}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3A322D] hover:bg-[#4E443E] text-[#FAF8F5] transition-all cursor-pointer font-medium"
              title="Permite a la propietaria cambiar tratamientos, horarios, WhatsApp y revisar reservas"
            >
              <Sliders className="w-3 h-3 text-[#C5A880]" />
              Panel Propietaria
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[#96897E] hover:text-white p-1"
              aria-label={isCollapsed ? 'Expandir información de demo' : 'Minimizar información de demo'}
            >
              {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="bg-[#1C1816] text-[#A69B91] px-4 py-1.5 text-[11px] border-t border-[#2C2623] flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <span>📍 PH Twist Tower, Obarrio</span>
              <span>•</span>
              <span>📱 WhatsApp configurado: <strong>+507 {config.phone}</strong></span>
              <span>•</span>
              <span className="text-emerald-400/90 font-medium">✓ Flujo interactivo de reservas activo</span>
            </div>
            <span className="text-[#867B72] italic text-[10px]">
              Datos y tarifas ajustables en tiempo real sin tocar código
            </span>
          </div>
        )}
      </aside>

      {/* Commercial Pitch Modal */}
      {isDekProposalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] text-[#2C2623] max-w-2xl w-full rounded-2xl shadow-2xl border border-[#E5DDD2] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#231E1B] text-[#FAF8F5] p-6 sm:p-8 relative">
              <button
                onClick={toggleDekProposal}
                className="absolute top-5 right-5 text-[#A69B91] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
              <p className="text-[#C5A880] text-xs font-semibold tracking-widest uppercase mb-1">
                Presentación Comercial · D.E.K NOVACORE
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">
                Presencia Digital & Automatización para ALAIA
              </h2>
              <p className="text-[#C5BCB3] text-sm mt-2 max-w-lg">
                Esta página ha sido concebida específicamente para elevar la percepción de lujo de ALAIA SKIN STUDIO y canalizar a sus clientas de Obarrio hacia citas confirmadas.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#EBE3D8] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFEB] flex items-center justify-center text-[#C5A880] mb-3">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2C2623] mb-1">
                    Imagen de Marca de Alto Valor
                  </h3>
                  <p className="text-xs text-[#695E56] leading-relaxed">
                    Diferencia a ALAIA de las estéticas comunes mediante una atmósfera editorial, sofisticada y minimalista que proyecta exclusividad y confianza.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EBE3D8] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFEB] flex items-center justify-center text-[#C5A880] mb-3">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2C2623] mb-1">
                    Citas Precalificadas a WhatsApp
                  </h3>
                  <p className="text-xs text-[#695E56] leading-relaxed">
                    Las clientas seleccionan servicio, fecha y hora antes de escribirte al 6302-2267. Ahorras horas de responder preguntas repetitivas de precios y horarios.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EBE3D8] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFEB] flex items-center justify-center text-[#C5A880] mb-3">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2C2623] mb-1">
                    Ubicación Clara en Twist Tower
                  </h3>
                  <p className="text-xs text-[#695E56] leading-relaxed">
                    Integración directa con Google Maps e instrucciones para Obarrio, evitando que clientas se extravíen o cancelen por desorientación.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EBE3D8] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFEB] flex items-center justify-center text-[#C5A880] mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#2C2623] mb-1">
                    Control Total Sin Programadores
                  </h3>
                  <p className="text-xs text-[#695E56] leading-relaxed">
                    Incluye un panel de administración para que la dueña actualice tratamientos, active o desactive precios y configure días de atención en segundos.
                  </p>
                </div>
              </div>

              <div className="bg-[#F6EFE9] border border-[#E7D6CA] rounded-xl p-4 text-xs text-[#5C4F46] leading-relaxed">
                <strong className="text-[#3A302A] block mb-1">Nota de transparencia comercial:</strong>
                Los precios y duraciones se muestran actualmente como &quot;Por consultar&quot; o editables para que la propietaria defina sus tarifas oficiales con D.E.K NOVACORE antes del lanzamiento definitivo.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#F4EFEA] border-t border-[#E5DDD2] flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-[#7A6E65]">
                D.E.K NOVACORE · Consultoría & Soluciones Digitales
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toggleDekProposal();
                    openAdminDrawer();
                  }}
                  className="px-4 py-2 rounded-lg bg-white border border-[#D8CFBE] text-[#2C2623] hover:bg-[#FAF8F5] text-xs font-medium cursor-pointer"
                >
                  Probar Panel Propietaria
                </button>
                <button
                  onClick={toggleDekProposal}
                  className="px-5 py-2 rounded-lg bg-[#2C2623] text-white hover:bg-[#3D3530] text-xs font-medium cursor-pointer"
                >
                  Explorar la Web
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
