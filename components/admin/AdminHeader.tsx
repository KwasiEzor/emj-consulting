'use client';

import { User } from 'lucide-react';

export function AdminHeader({ user }: { user: any }) {
  return (
    <header className="glass-dark border-b border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tableau de Bord</h2>
          <p className="text-white/60 text-sm">Bienvenue, {user?.name || user?.email}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <User size={20} className="text-[var(--color-gold)]" />
          </div>
        </div>
      </div>
    </header>
  );
}
