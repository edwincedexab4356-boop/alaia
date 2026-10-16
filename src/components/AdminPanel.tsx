import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Check, Clock, Phone, MapPin, Instagram, Calendar, FileText, Sliders } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { Treatment, ServiceCategory } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    isAdminDrawerOpen,
    closeAdminDrawer,
    config,
    updateStudioConfig,
    treatments,
    updateTreatment,
    addTreatment,
    bookings,
    updateBookingStatus,
    resetToDefaults,
  } = useStudio();

  const [activeTab, setActiveTab] = useState<'tratamientos' | 'reservas' | 'contacto' | 'textos'>('tratamientos');
  const [formData, setFormData] = useState(config);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // New treatment form modal inside admin
  const [showNewTreatmentForm, setShowNewTreatmentForm] = useState(false);
  const [newTreatment, setNewTreatment] = useState<Omit<Treatment, 'id'>>({
    name: '',
    category: 'faciales',
    shortDescription: '',
    fullDescription: '',
    duration: '60 min',
    price: '$65',
    showPrice: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Tratamiento especializado'],
    recommendations: '',
    isConfirmedByOwner: true,
  });

  if (!isAdminDrawerOpen) return null;

  const handleSaveConfig = () => {
    updateStudioConfig(formData);
    setSaveFeedback('Configuración guardada correctamente.');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleCreateTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTreatment.name.trim()) return;
    addTreatment(newTreatment);
    setShowNewTreatmentForm(false);
    setNewTreatment({
      name: '',
      category: 'faciales',
      shortDescription: '',
      fullDescription: '',
      duration: '60 min',
      price: '$65',
      showPrice: true,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
      benefits: ['Tratamiento especializado'],
      recommendations: '',
      isConfirmedByOwner: true,
    });
    setSaveFeedback('Tratamiento agregado.');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] text-[#2C2623] w-full max-w-3xl h-full flex flex-col shadow-2xl border-l border-[#E5DDD2] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-[#231E1B] text-white p-5 sm:p-6 shrink-0 flex items-center justify-between border-b border-[#3A322D]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#3A322D] text-[#C5A880]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-white">
                  Panel de la Propietaria
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#D4B8A5] text-[10px] tracking-wider uppercase font-semibold">
                  Demo D.E.K
                </span>
              </div>
              <p className="text-xs text-[#A69B91]">
                Gestiona tratamientos, precios, horarios, datos de contacto y reservas sin tocar código.
              </p>
            </div>
          </div>

          <button
            onClick={closeAdminDrawer}
            className="p-2 rounded-full text-[#A69B91] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar panel administrativo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#FAF8F5] border-b border-[#E5DDD2] px-6 py-2.5 flex flex-wrap gap-2 shrink-0">
          {[
            { id: 'tratamientos', label: 'Tratamientos & Tarifas', icon: SparklesIcon },
            { id: 'reservas', label: `Reservas (${bookings.length})`, icon: Calendar },
            { id: 'contacto', label: 'Contacto & Horarios', icon: Phone },
            { id: 'textos', label: 'Textos de la Web', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#2C2623] text-white shadow-xs'
                  : 'text-[#695E56] hover:bg-[#EFE8DF] hover:text-[#2C2623]'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Feedback Alert */}
        {saveFeedback && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveFeedback}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: TRATAMIENTOS */}
          {activeTab === 'tratamientos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-[#EAE3D9]">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#2C2623]">
                    Catálogo de Servicios & Rituales
                  </h3>
                  <p className="text-xs text-[#695E56]">
                    Edita precios, duraciones o activa la visibilidad según lo que ofrezcas en ALAIA.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewTreatmentForm(!showNewTreatmentForm)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C2623] text-white text-xs font-medium hover:bg-[#433A35] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Nuevo Tratamiento</span>
                </button>
              </div>

              {/* Form to add a new treatment */}
              {showNewTreatmentForm && (
                <form
                  onSubmit={handleCreateTreatment}
                  className="p-4 rounded-xl bg-white border border-[#D5C9B8] space-y-3 shadow-xs"
                >
                  <h4 className="font-serif text-sm font-semibold text-[#2C2623]">
                    Agregar Nuevo Tratamiento al Estudio
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#554C45]">Nombre del servicio</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Hidrafacial Oxigenante"
                        value={newTreatment.name}
                        onChange={(e) => setNewTreatment({ ...newTreatment, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#554C45]">Categoría</label>
                      <select
                        value={newTreatment.category}
                        onChange={(e) => setNewTreatment({ ...newTreatment, category: e.target.value as ServiceCategory })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                      >
                        <option value="faciales">Faciales</option>
                        <option value="peeling">Peeling</option>
                        <option value="cosmetologia">Cosmetología & Cosmiatría</option>
                        <option value="maderoterapia">Maderoterapia</option>
                        <option value="masajes">Masajes Reductores</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#554C45]">Duración estimada</label>
                      <input
                        type="text"
                        placeholder="Ej. 60 min"
                        value={newTreatment.duration}
                        onChange={(e) => setNewTreatment({ ...newTreatment, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#554C45]">Precio (ej. $65 o consultar)</label>
                      <input
                        type="text"
                        placeholder="Ej. $65"
                        value={newTreatment.price}
                        onChange={(e) => setNewTreatment({ ...newTreatment, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#554C45]">Descripción breve</label>
                    <textarea
                      rows={2}
                      placeholder="Breve reseña de la experiencia..."
                      value={newTreatment.shortDescription}
                      onChange={(e) => setNewTreatment({ ...newTreatment, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewTreatmentForm(false)}
                      className="px-3 py-1.5 rounded-lg border border-[#D5C9B8] text-xs"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#2C2623] text-white text-xs font-medium"
                    >
                      Guardar Tratamiento
                    </button>
                  </div>
                </form>
              )}

              {/* List of existing treatments */}
              <div className="space-y-4">
                {treatments.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <h4 className="font-serif text-base font-medium text-[#2C2623]">
                            {t.name}
                          </h4>
                          <span className="text-[10px] uppercase font-semibold text-[#8C6D4C]">
                            {t.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-[#695E56] flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={t.showPrice}
                            onChange={(e) => updateTreatment({ ...t, showPrice: e.target.checked })}
                            className="rounded text-[#2C2623]"
                          />
                          <span>Mostrar precio público</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[10px] text-[#8C7E74] font-medium uppercase mb-0.5">
                          Duración
                        </label>
                        <input
                          type="text"
                          value={t.duration}
                          onChange={(e) => updateTreatment({ ...t, duration: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                          placeholder="Ej. 60 min"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#8C7E74] font-medium uppercase mb-0.5">
                          Tarifa / Precio
                        </label>
                        <input
                          type="text"
                          value={t.price}
                          onChange={(e) => updateTreatment({ ...t, price: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                          placeholder="Ej. $75 o Paquete de 3"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C7E74] font-medium uppercase mb-0.5">
                        Descripción Breve
                      </label>
                      <textarea
                        rows={2}
                        value={t.shortDescription}
                        onChange={(e) => updateTreatment({ ...t, shortDescription: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] text-xs bg-[#FAF8F5]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RESERVAS */}
          {activeTab === 'reservas' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#EAE3D9]">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#2C2623]">
                    Bandeja de Solicitudes de Citas
                  </h3>
                  <p className="text-xs text-[#695E56]">
                    Registros en tiempo real generados desde la web.
                  </p>
                </div>
                <span className="text-xs text-[#8C7E74]">
                  Total: {bookings.length} solicitudes
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 text-[#8C7E74] text-xs">
                  No hay reservas registradas todavía. Prueba agendar una cita desde la página web.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F2ECE3] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#F0EAE1] text-[#2C2623]">
                            {booking.code}
                          </span>
                          <span className="font-serif text-sm font-medium text-[#2C2623]">
                            {booking.treatmentName}
                          </span>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#8C7E74]">Estado:</span>
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium border cursor-pointer ${
                              booking.status === 'confirmada'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : booking.status === 'pendiente'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : booking.status === 'atendida'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="atendida">Atendida</option>
                            <option value="cancelada">Cancelada</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#5F554D]">
                        <div>
                          <span className="text-[#8C7E74] block text-[10px]">Clienta:</span>
                          <strong>{booking.clientName}</strong>
                        </div>
                        <div>
                          <span className="text-[#8C7E74] block text-[10px]">Teléfono:</span>
                          <a
                            href={`https://wa.me/${booking.clientPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:underline font-medium"
                          >
                            {booking.clientPhone}
                          </a>
                        </div>
                        <div>
                          <span className="text-[#8C7E74] block text-[10px]">Fecha:</span>
                          <span>{booking.date}</span>
                        </div>
                        <div>
                          <span className="text-[#8C7E74] block text-[10px]">Horario:</span>
                          <span>{booking.timeSlot}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="p-2.5 rounded-lg bg-[#FAF4ED] text-[11px] text-[#6E5D50]">
                          <strong>Notas de la clienta:</strong> {booking.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACTO & HORARIOS */}
          {activeTab === 'contacto' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-[#EAE3D9]">
                <h3 className="font-serif text-lg font-medium text-[#2C2623]">
                  Datos de Contacto & Ubicación
                </h3>
                <p className="text-xs text-[#695E56]">
                  Ajusta el número de WhatsApp oficial, dirección y horarios de lunes a domingo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#554C45] mb-1">
                    Teléfono / WhatsApp de atención
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsappNumber: '507' + e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-white"
                  />
                  <p className="text-[10px] text-[#8C7E74] mt-0.5">
                    Actualmente configurado con el número oficial: 63022267
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554C45] mb-1">
                    Enlace de Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554C45] mb-1">
                  Dirección oficial
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-white"
                />
              </div>

              {/* Schedules per day */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs font-medium text-[#554C45]">
                  Configuración de Horarios (Lunes a Domingo)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formData.schedules.map((sched, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5DDD2] text-xs">
                      <span className="w-20 font-medium text-[#2C2623]">{sched.day}</span>
                      <input
                        type="text"
                        value={sched.hours}
                        onChange={(e) => {
                          const updated = [...formData.schedules];
                          updated[idx].hours = e.target.value;
                          setFormData({ ...formData, schedules: updated });
                        }}
                        className="flex-1 px-2 py-1 rounded border border-[#D5C9B8] text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2C2623] text-white text-xs font-medium hover:bg-[#433A35] transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#C5A880]" />
                  <span>Guardar Datos de Contacto</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: TEXTOS DE LA WEB */}
          {activeTab === 'textos' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#EAE3D9]">
                <h3 className="font-serif text-lg font-medium text-[#2C2623]">
                  Personalización de Mensajes & Marca
                </h3>
                <p className="text-xs text-[#695E56]">
                  Modifica los textos principales para adaptarlos al tono exacto de la marca.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554C45] mb-1">
                  Subtítulo del Hero
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554C45] mb-1">
                  Título de la sección Sobre ALAIA
                </label>
                <input
                  type="text"
                  value={formData.aboutTitle}
                  onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554C45] mb-1">
                  Texto descriptivo de la sección Sobre ALAIA
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutText}
                  onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2C2623] text-white text-xs font-medium hover:bg-[#433A35] transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#C5A880]" />
                  <span>Guardar Textos</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F2EDE7] border-t border-[#E5DDD2] flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              if (window.confirm('¿Deseas restablecer todos los valores originales de la demostración?')) {
                resetToDefaults();
                setSaveFeedback('Valores restablecidos a la propuesta original.');
                setTimeout(() => setSaveFeedback(null), 3000);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8C7E74] hover:text-[#2C2623] hover:bg-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Demo</span>
          </button>

          <button
            onClick={closeAdminDrawer}
            className="px-5 py-2 rounded-lg bg-[#2C2623] text-white text-xs font-medium hover:bg-[#433A35] transition-colors cursor-pointer"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}
