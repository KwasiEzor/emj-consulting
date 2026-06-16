'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[\s+]/g, '')}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
