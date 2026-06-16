'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassmorphCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  hover?: boolean;
}

export function GlassmorphCard({
  children,
  className,
  variant = 'light',
  hover = true,
}: GlassmorphCardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-xl)] p-6',
        variant === 'light' ? 'glass' : 'glass-dark',
        hover && 'transition-all duration-300 hover:scale-105 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
