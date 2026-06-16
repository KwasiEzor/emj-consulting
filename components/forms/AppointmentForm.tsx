'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema, AppointmentFormData } from '@/lib/validations';
import { useLocale } from 'next-intl';
import { Loader2, Calendar, Clock } from 'lucide-react';
import { TIME_SLOTS } from '@/lib/constants';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Service {
  id: string;
  titleFr: string;
  titleEn: string;
  icon: string;
}

export function AppointmentForm({ services }: { services: Service[] }) {
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  // Generate next 14 days (excluding past dates)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(startOfDay(new Date()), i + 1);
    return format(date, 'yyyy-MM-dd');
  });

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setValue('date', date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setValue('time', time);
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setSelectedDate('');
        setSelectedTime('');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Informations</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Nom complet *</label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          placeholder="Votre nom"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">Téléphone *</label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          placeholder="+33 1 23 45 67 89"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Service *</label>
        <select
          {...register('serviceId')}
          className="w-full px-4 py-3 glass-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        >
          <option value="">Sélectionnez un service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id} className="bg-[var(--color-navy)]">
              {service.icon} {locale === 'fr' ? service.titleFr : service.titleEn}
            </option>
          ))}
        </select>
        {errors.serviceId && (
          <p className="mt-1 text-sm text-red-400">{errors.serviceId.message}</p>
        )}
      </div>

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium mb-3 flex items-center">
          <Calendar className="mr-2" size={18} />
          Choisir une date *
        </label>
        <div className="grid grid-cols-7 gap-2">
          {availableDates.map((date) => {
            const dateObj = new Date(date);
            const dayName = format(dateObj, 'EEE', { locale: fr });
            const dayNum = format(dateObj, 'd');

            return (
              <button
                key={date}
                type="button"
                onClick={() => handleDateSelect(date)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedDate === date
                    ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                    : 'glass-dark hover:bg-white/10'
                }`}
              >
                <div className="text-xs opacity-70">{dayName}</div>
                <div className="font-bold">{dayNum}</div>
              </button>
            );
          })}
        </div>
        {errors.date && (
          <p className="mt-2 text-sm text-red-400">{errors.date.message}</p>
        )}
      </div>

      {/* Time Selection */}
      <div>
        <label className="block text-sm font-medium mb-3 flex items-center">
          <Clock className="mr-2" size={18} />
          Choisir l'heure *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeSelect(time)}
              className={`p-3 rounded-lg text-center font-medium transition-all ${
                selectedTime === time
                  ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                  : 'glass-dark hover:bg-white/10'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        {errors.time && (
          <p className="mt-2 text-sm text-red-400">{errors.time.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-2">Notes (optionnel)</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] resize-none"
          placeholder="Informations complémentaires..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg font-semibold hover:bg-[var(--color-gold-light)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Confirmation...
          </>
        ) : (
          'Confirmer le Rendez-vous'
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 glass rounded-lg border border-green-500/50 text-green-400">
          Rendez-vous confirmé ! Vous recevrez un email de confirmation.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 glass rounded-lg border border-red-500/50 text-red-400">
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}
    </form>
  );
}
