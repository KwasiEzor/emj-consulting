import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ContactForm } from '@/components/forms/ContactForm';
import { fadeInUp } from '@/lib/animations';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <section className="text-center mb-16">
        <ScrollReveal variant={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">
            Contactez-nous
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter !
          </p>
        </ScrollReveal>
      </section>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <ScrollReveal delay={0.1}>
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un Message</h2>
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal delay={0.2}>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Informations de Contact</h2>

            {/* Contact Details */}
            <GlassmorphCard>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[var(--color-gold)] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold mb-1">Adresse</p>
                    <p className="text-white/70 text-sm">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-[var(--color-gold)] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold mb-1">Téléphone</p>
                    <p className="text-white/70 text-sm">{CONTACT_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-[var(--color-gold)] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-white/70 text-sm">{CONTACT_INFO.email}</p>
                  </div>
                </div>
              </div>
            </GlassmorphCard>

            {/* Social Media */}
            <GlassmorphCard>
              <h3 className="font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </GlassmorphCard>

            {/* Map Placeholder */}
            <GlassmorphCard>
              <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
                <MapPin size={48} className="text-white/20" />
              </div>
            </GlassmorphCard>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
