'use client';

import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const t = useTranslations('common');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 glass-dark backdrop-blur-xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full p-8 pt-20">
              <nav className="flex flex-col space-y-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-xl text-white hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  href="/appointment"
                  onClick={onClose}
                  className="block w-full px-6 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg font-semibold text-center hover:bg-[var(--color-gold-light)] transition-all"
                >
                  {t('bookAppointment')}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
