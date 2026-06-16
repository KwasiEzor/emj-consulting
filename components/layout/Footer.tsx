'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gold-gradient mb-4">
              EMJ Consulting
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {t('description')}
            </p>
            <div className="flex space-x-3 text-sm">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
              >
                FB
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
              >
                IG
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
              >
                IN
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-white/60 hover:text-white transition-colors text-sm">
                  {tNav('destinations')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">
                  Visa Touristique
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">
                  Visa Étudiant
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">
                  Visa Affaires
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-white/60 hover:text-white transition-colors text-sm">
                  {tNav('appointment')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-white/60">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-white/60">
                <Phone size={16} className="flex-shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-white/60">
                <Mail size={16} className="flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>© {currentYear} EMJ Consulting. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
