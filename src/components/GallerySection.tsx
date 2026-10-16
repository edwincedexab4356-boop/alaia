import React, { useState } from 'react';
import { Eye, X, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery } = useStudio();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filters = [
    { id: 'todos', label: 'Todas las Vistas' },
    { id: 'cabinas', label: 'Cabinas & Espacios' },
    { id: 'rituales', label: 'Rituales' },
    { id: 'texturas', label: 'Texturas & Productos' },
    { id: 'bienestar', label: 'Bienestar' },
  ];

  const filteredItems = activeFilter === 'todos'
    ? gallery
    : gallery.filter((item) => item.category === activeFilter);

  return (
    <section id="galeria" className="py-20 sm:py-28 bg-[#F4EFEA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DFD3] text-[#7A695A] text-[11px] font-medium tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            Atmósfera & Detalles
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C2623] font-light">
            Galería visual
          </h2>
          <p className="text-sm text-[#695E56] font-light">
            Una mirada a los espacios, texturas y momentos de cuidado que componen la experiencia ALAIA en Obarrio.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-[#2C2623] text-white shadow-xs'
                    : 'bg-white/80 text-[#695E56] hover:bg-white hover:text-[#2C2623] border border-[#E0D7CB]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#E5DDD2] aspect-4/3 cursor-pointer border border-[#E0D7CB] shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#D4B8A5] font-medium mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-medium drop-shadow-xs">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E5DDD2] line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#C5A880]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver en detalle</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on imagery */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-[#8C7E74] italic max-w-xl mx-auto">
            * Galería de demostración editorial preparada por D.E.K NOVACORE. Lista para albergar las fotografías de alta resolución exclusivas de las cabinas de ALAIA SKIN STUDIO en PH Twist Tower.
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="max-w-4xl w-full bg-[#1F1B19] rounded-2xl overflow-hidden shadow-2xl border border-white/10 text-white animate-in zoom-in-95 duration-200">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Cerrar vista completa"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[70vh] flex items-center justify-center bg-black/40">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#26211E] flex flex-wrap justify-between items-center gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-[#B5A89E] mt-1 max-w-lg">
                  {selectedImage.caption}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
