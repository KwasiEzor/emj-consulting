'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations';
import { Loader2, Send } from 'lucide-react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
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
        <label className="block text-sm font-medium mb-2">Téléphone</label>
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

      {/* Country */}
      <div>
        <label className="block text-sm font-medium mb-2">Pays *</label>
        <input
          {...register('country')}
          type="text"
          className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          placeholder="France"
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-2">Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] resize-none"
          placeholder="Décrivez votre projet..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
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
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2" size={20} />
            Envoyer le message
          </>
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 glass rounded-lg border border-green-500/50 text-green-400">
          Message envoyé avec succès ! Nous vous répondrons sous 24h.
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
