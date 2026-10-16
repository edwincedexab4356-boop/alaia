import React from 'react';
import { Sparkles, HeartHandshake, Shield, Leaf, Calendar } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const AboutSection: React.FC = () => {
  const { config, openBooking } = useStudio();

  const values = [
    {
      icon: Sparkles,
      title: 'Cuidado Personalizado',
      desc: 'Cada sesión se ajusta minuciosamente al estado actual de tu cutis y necesidades particulares.',
    },
    {
      icon: HeartHandshake,
      title: 'Atención Consciente',
      desc: 'Un espacio íntimo donde la prioridad es tu comodidad, bienestar y tranquilidad absoluta.',
    },
    {
      icon: Leaf,
      title: 'Técnicas Respetuosas',
      desc: 'Protocolos estéticos y corporales enfocados en potenciar tu belleza natural sin agresiones.',
    },
    {
      icon: Shield,
      title: 'Privacidad & Higiene',
      desc: 'Cabinas individuales en PH Twist Tower preparadas con los más altos estándares de higiene.',
    },
  ];

  return (
    <section id="el-estudio" className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column: Editorial Dual Frames */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              
              <div className="space-y-4 sm:space-y-6">
                <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-[#EAE2D7]">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                    alt="Cabina y ambiente sereno de ALAIA SKIN STUDIO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-xl bg-[#F4EDE5] border border-[#E5DDD2] text-left">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C6D4C] block mb-0.5">
                    Ubicación
                  </span>
                  <p className="font-serif text-sm text-[#2C2623] font-medium">
                    PH Twist Tower · Obarrio
                  </p>
                  <p className="text-[11px] text-[#695E56] mt-0.5">
                    Un refugio de calma en el corazón de la ciudad.
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-10">
                <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] text-left shadow-xs">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C6D4C] block mb-0.5">
                    Filosofía
                  </span>
                  <p className="font-serif text-sm text-[#2C2623] font-medium">
                    Belleza Consciente
                  </p>
                  <p className="text-[11px] text-[#695E56] mt-0.5">
                    Tratamientos diseñados para acompañar tu bienestar.
                  </p>
                </div>
                <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-[#EAE2D7]">
                  <img
                    src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"
                    alt="Detalles de texturas y spa en ALAIA SKIN STUDIO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C6D4C]">
                Conoce el Centro
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C2623] font-light leading-tight">
                {config.aboutTitle}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#5F554D] font-light leading-relaxed">
              <p className="text-base sm:text-lg text-[#3A322D] font-normal leading-relaxed">
                {config.aboutText}
              </p>
              <p className="text-xs sm:text-sm text-[#73685F] leading-relaxed">
                Nuestra propuesta está enfocada en crear un oasis donde desconectar del ritmo diario, renovar la energía y recibir tratamientos faciales y corporales guiados por el conocimiento dérmico y la calidez humana.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#EBE3D8] space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#C5A880]" />
                      <h3 className="font-serif text-sm font-medium text-[#2C2623]">{v.title}</h3>
                    </div>
                    <p className="text-[11px] text-[#695E56] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Proposal Note & CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2C2623] text-white hover:bg-[#433A35] text-xs font-medium tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Agendar mi sesión</span>
              </button>

              <span className="text-[11px] text-[#8C7E74] italic">
                * Espacio reservado para las fotografías oficiales de las instalaciones y cabinas de ALAIA.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
