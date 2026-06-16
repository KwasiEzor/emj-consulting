'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, MessageSquare, FileText, BarChart, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Clients', href: '/admin/clients' },
  { icon: Calendar, label: 'Rendez-vous', href: '/admin/appointments' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: FileText, label: 'Blog', href: '/admin/blog' },
  { icon: BarChart, label: 'Analytics', href: '/admin/analytics' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-dark border-r border-white/10 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gold-gradient">EMJ Admin</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </nav>
    </aside>
  );
}
