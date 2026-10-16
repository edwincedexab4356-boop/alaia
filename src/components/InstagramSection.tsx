import React from 'react';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const InstagramSection: React.FC = () => {
  const { config } = useStudio();

  // Curated visual feed previews
  const feedItems = [
    {
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      label: 'Rutinas dérmicas',
    },
    {
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      label: 'Glow natural',
    },
    {
      img: 'https://images.unsplash.com/photo-1512290900672-1f02e6a0d24e?auto=format&fit=crop&w=600&q=80',
      label: 'Peeling & Cuidado',
    },
    {
      img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
      label: 'Maderoterapia',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE3D9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EDE5] text-[#8C6D4C] text-[11px] font-medium tracking-widest uppercase">
            <Instagram className="w-3.5 h-3.5" />
            <span>{config.instagramHandle}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2623] font-light">
            Conoce más de ALAIA
          </h2>

          <p className="text-sm text-[#695E56] font-light">
            Descubre nuestro universo de belleza, cuidado y bienestar.
          </p>

          <div className="pt-2">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C2623] hover:bg-[#433A35] text-white text-xs font-medium tracking-wider uppercase shadow-xs transition-all"
            >
              <Instagram className="w-4 h-4 text-[#C5A880]" />
              <span>Visitar Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </a>
          </div>
        </div>

        {/* Visual Instagram Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {feedItems.map((item, index) => (
            <a
              key={index}
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#EAE2D8] border border-[#E5DDD2] shadow-xs"
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-white mb-1.5" />
                <span className="text-xs font-medium">{item.label}</span>
                <span className="text-[10px] text-[#C5A880] mt-0.5">Ver en @alaia.skinstudio</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#8C7E74]">
            Enlace oficial a la cuenta verificada:{' '}
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C2623] underline font-medium hover:text-[#C5A880]"
            >
              instagram.com/alaia.skinstudio
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
