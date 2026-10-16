import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageCircle, ChevronRight, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { Treatment } from '../types';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    closeBooking,
    treatments,
    preselectedTreatmentId,
    addBooking,
    getWhatsAppLink,
    config,
  } = useStudio();

  // Step flow: 1: Treatment -> 2: Date & Time -> 3: Client Info -> 4: Summary & Confirm -> 5: Success
  const [step, setStep] = useState<number>(1);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Completed booking state
  const [confirmedBookingCode, setConfirmedBookingCode] = useState<string | null>(null);

  // Time slots for appointment demo
  const availableSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  // Set default treatment if preselected or first item
  useEffect(() => {
    if (preselectedTreatmentId) {
      setSelectedTreatmentId(preselectedTreatmentId);
      setStep(2); // Jump straight to date if treatment was clicked
    } else if (treatments.length > 0 && !selectedTreatmentId) {
      setSelectedTreatmentId(treatments[0].id);
      setStep(1);
    }
  }, [preselectedTreatmentId, treatments]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  if (!isBookingOpen) return null;

  const selectedTreatment: Treatment | undefined = treatments.find(
    (t) => t.id === selectedTreatmentId
  );

  const handleNextStep = () => {
    setValidationError(null);

    if (step === 1) {
      if (!selectedTreatmentId) {
        setValidationError('Por favor selecciona un ritual o tratamiento.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate) {
        setValidationError('Por favor selecciona la fecha de tu preferencia.');
        return;
      }
      if (!selectedTimeSlot) {
        setValidationError('Por favor elige uno de los horarios disponibles.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!clientName.trim()) {
        setValidationError('Por favor ingresa tu nombre completo.');
        return;
      }
      if (!clientPhone.trim() || clientPhone.trim().length < 7) {
        setValidationError('Por favor ingresa un número de teléfono o WhatsApp válido.');
        return;
      }
      setStep(4);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedTreatment) return;

    const newBooking = addBooking({
      treatmentId: selectedTreatment.id,
      treatmentName: selectedTreatment.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      notes: clientNotes.trim(),
    });

    setConfirmedBookingCode(newBooking.code);
    setStep(5);
  };

  const handleResetModal = () => {
    setStep(1);
    setSelectedTimeSlot('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientNotes('');
    setConfirmedBookingCode(null);
    closeBooking();
  };

  const buildWhatsAppMessage = () => {
    if (!selectedTreatment) return '';
    return `¡Hola ALAIA SKIN STUDIO! Deseo confirmar la solicitud de mi cita:
✨ Código: ${confirmedBookingCode || 'ALAIA-PROMO'}
💆‍♀️ Tratamiento: ${selectedTreatment.name}
📅 Fecha sugerida: ${selectedDate}
⏰ Hora: ${selectedTimeSlot}
👤 Nombre: ${clientName}
📱 Teléfono: ${clientPhone}
${clientNotes ? `📝 Notas: ${clientNotes}` : ''}
📍 Ubicación: PH Twist Tower, Obarrio.`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] text-[#2C2623] max-w-xl w-full rounded-2xl shadow-2xl border border-[#E5DDD2] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#231E1B] text-[#FAF8F5] p-5 sm:p-6 relative shrink-0">
          <button
            onClick={handleResetModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#A69B91] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal de reserva"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A880]">
              Sistema de Citas · ALAIA SKIN STUDIO
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            {step === 5 ? 'Solicitud Registrada con Éxito' : 'Reserva tu Experiencia'}
          </h2>

          <p className="text-[#BDB2A7] text-xs mt-1">
            {step === 5
              ? 'Tu cita ha sido guardada en el panel administrativo de demostración.'
              : 'Paso ' + step + ' de 4 · Cuidado personalizado en PH Twist Tower, Obarrio'}
          </p>

          {/* Stepper indicator (if not in success step) */}
          {step < 5 && (
            <div className="flex items-center gap-1.5 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-[#C5A880]' : 'bg-[#433932]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {validationError && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: Treatment Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-[#2C2623] font-medium">
                  1. Selecciona el ritual deseado
                </h3>
                <p className="text-xs text-[#695E56]">
                  Elige el tratamiento facial o corporal que deseas agendar:
                </p>
              </div>

              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {treatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    onClick={() => setSelectedTreatmentId(treatment.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedTreatmentId === treatment.id
                        ? 'border-[#2C2623] bg-white shadow-xs ring-1 ring-[#2C2623]'
                        : 'border-[#E5DDD2] bg-white/60 hover:bg-white hover:border-[#D5C9B8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-medium text-[#2C2623]">
                          {treatment.name}
                        </h4>
                        <p className="text-[11px] text-[#8C7E74] flex items-center gap-2 mt-0.5">
                          <span>⏱ {treatment.duration || 'Duración a coordinar'}</span>
                          {treatment.showPrice && treatment.price && (
                            <span>• {treatment.price}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedTreatmentId === treatment.id
                        ? 'border-[#2C2623] bg-[#2C2623] text-white'
                        : 'border-[#D5C9B8]'
                    }`}>
                      {selectedTreatmentId === treatment.id && <span className="w-2 h-2 rounded-full bg-[#FAF8F5]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-[#2C2623] font-medium">
                  2. Fecha y horario de tu preferencia
                </h3>
                <p className="text-xs text-[#695E56]">
                  Ritual seleccionado: <strong className="text-[#2C2623]">{selectedTreatment?.name}</strong>
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#554C45] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Día de la cita</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B8] bg-white text-xs sm:text-sm text-[#2C2623] focus:outline-hidden focus:ring-1 focus:ring-[#2C2623]"
                />
                <p className="text-[10px] text-[#8C7E74]">
                  Atención disponible de lunes a domingo previa confirmación de cabina.
                </p>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#554C45] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Selecciona un turno de atención</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-3 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'border-[#2C2623] bg-[#2C2623] text-white shadow-xs'
                          : 'border-[#D5C9B8] bg-white text-[#554C45] hover:bg-[#F5EFEB]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Client Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-[#2C2623] font-medium">
                  3. Tus datos de contacto
                </h3>
                <p className="text-xs text-[#695E56]">
                  Para enviarte la confirmación y coordinar el acceso a PH Twist Tower:
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#554C45] mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7E74] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Ej. María Sánchez"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-xs sm:text-sm text-[#2C2623] focus:outline-hidden focus:ring-1 focus:ring-[#2C2623]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554C45] mb-1">
                    Teléfono / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7E74] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="Ej. +507 6302-2267"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-xs sm:text-sm text-[#2C2623] focus:outline-hidden focus:ring-1 focus:ring-[#2C2623]"
                    />
                  </div>
                  <p className="text-[10px] text-[#8C7E74] mt-1">
                    Se utilizará para confirmar tu espacio y enviarte recordatorios.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554C45] mb-1">
                    Correo electrónico <span className="text-[#8C7E74] font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-xs sm:text-sm text-[#2C2623] focus:outline-hidden focus:ring-1 focus:ring-[#2C2623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554C45] mb-1">
                    Notas adicionales o condiciones de piel
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Piel sensible, alergias, o primera vez en el estudio..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-xs sm:text-sm text-[#2C2623] focus:outline-hidden focus:ring-1 focus:ring-[#2C2623]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Confirm */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-[#2C2623] font-medium">
                  4. Resumen de tu solicitud
                </h3>
                <p className="text-xs text-[#695E56]">
                  Revisa los detalles antes de enviar tu solicitud a ALAIA SKIN STUDIO:
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-[#F0EAE1]">
                  <span className="text-[#8C7E74]">Ritual:</span>
                  <span className="font-medium text-[#2C2623] text-right">{selectedTreatment?.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE1]">
                  <span className="text-[#8C7E74]">Fecha propuesta:</span>
                  <span className="font-medium text-[#2C2623]">{selectedDate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE1]">
                  <span className="text-[#8C7E74]">Horario:</span>
                  <span className="font-medium text-[#2C2623]">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE1]">
                  <span className="text-[#8C7E74]">Clienta:</span>
                  <span className="font-medium text-[#2C2623]">{clientName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE1]">
                  <span className="text-[#8C7E74]">Teléfono:</span>
                  <span className="font-medium text-[#2C2623]">{clientPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7E74]">Ubicación:</span>
                  <span className="font-medium text-[#2C2623] text-right">PH Twist Tower, Obarrio</span>
                </div>
              </div>

              {/* Informative notice */}
              <div className="p-3.5 rounded-xl bg-[#F6EFE9] border border-[#E7D6CA] text-xs text-[#5C4F46] space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#3A302A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Flujo de reserva asistida D.E.K NOVACORE</span>
                </div>
                <p className="leading-relaxed">
                  Al pulsar &quot;Enviar solicitud de reserva&quot;, tu cita se registrará en el sistema y podrás enviarla al WhatsApp oficial <strong>(+507 {config.phone})</strong> para su confirmación instantánea.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Real WhatsApp Bridge */}
          {step === 5 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#EFE8DF] text-[#695E56] text-xs font-mono font-medium">
                  Código de Reserva: {confirmedBookingCode}
                </span>
                <h3 className="font-serif text-2xl text-[#2C2623]">
                  ¡Solicitud Enviada con Éxito!
                </h3>
                <p className="text-xs sm:text-sm text-[#5F554D] max-w-md mx-auto leading-relaxed">
                  Gracias, <strong>{clientName}</strong>. Hemos registrado tu reserva para <strong>{selectedTreatment?.name}</strong> el día <strong>{selectedDate}</strong> a las <strong>{selectedTimeSlot}</strong>.
                </p>
              </div>

              {/* Action: Dispatch directly to WhatsApp */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F8EE] border border-[#C5E9D2] text-left space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <h4 className="text-xs sm:text-sm font-semibold text-[#18532F]">
                    Paso final recomendado:
                  </h4>
                </div>
                <p className="text-xs text-[#2E6B47] leading-relaxed">
                  Haz clic en el siguiente botón para enviar tu código y datos directamente al WhatsApp oficial del estudio (+507 {config.phone}).
                </p>
                <a
                  href={getWhatsAppLink(buildWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-medium tracking-wide shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar datos por WhatsApp (+507 {config.phone})</span>
                </a>
              </div>

              {/* Commercial demo note */}
              <div className="text-[11px] text-[#8C7E74] italic">
                * Como parte de esta demostración comercial de D.E.K NOVACORE, esta cita ya aparece en el <strong>Panel de la Propietaria</strong> para gestionar su estatus.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-[#F4EFEA] border-t border-[#E5DDD2] flex items-center justify-between shrink-0">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => {
                setValidationError(null);
                setStep(step - 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[#554C45] hover:text-[#2C2623] hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#2C2623] hover:bg-[#433A35] text-white text-xs font-medium tracking-wide uppercase transition-all shadow-xs cursor-pointer ml-auto"
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleConfirmBooking}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2C2623] hover:bg-[#433A35] text-white text-xs font-medium tracking-wider uppercase transition-all shadow-md cursor-pointer ml-auto"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
              <span>Enviar solicitud de reserva</span>
            </button>
          )}

          {step === 5 && (
            <button
              onClick={handleResetModal}
              className="px-6 py-2.5 rounded-xl bg-[#2C2623] text-white text-xs font-medium tracking-wide transition-all cursor-pointer ml-auto"
            >
              Cerrar y Volver a la Web
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
