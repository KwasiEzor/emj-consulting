'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variants;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, variant, delay = 0, className }: ScrollRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const defaultVariant: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variant || defaultVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
