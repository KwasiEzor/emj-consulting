'use client';

import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;

  const toggleLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg glass-dark hover:bg-white/20 transition-colors"
      aria-label="Toggle language"
    >
      <Globe size={18} className="text-[var(--color-gold)]" />
      <span className="text-sm font-medium uppercase">{locale}</span>
    </button>
  );
}
