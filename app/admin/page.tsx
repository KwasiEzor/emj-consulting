import { db } from '@/db';
import { clients, appointments, messages, blogPosts } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { Users, Calendar, MessageSquare, FileText } from 'lucide-react';

export default async function AdminDashboard() {
  // Get stats
  const [
    totalClients,
    pendingAppointments,
    unreadMessages,
    publishedPosts,
  ] = await Promise.all([
    db.select({ count: count() }).from(clients),
    db
      .select({ count: count() })
      .from(appointments)
      .where(eq(appointments.status, 'pending')),
    db
      .select({ count: count() })
      .from(messages)
      .where(eq(messages.isRead, false)),
    db
      .select({ count: count() })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published')),
  ]);

  const stats = [
    {
      icon: Users,
      label: 'Total Clients',
      value: totalClients[0].count,
      color: 'text-blue-400',
    },
    {
      icon: Calendar,
      label: 'Rendez-vous en attente',
      value: pendingAppointments[0].count,
      color: 'text-yellow-400',
    },
    {
      icon: MessageSquare,
      label: 'Messages non lus',
      value: unreadMessages[0].count,
      color: 'text-green-400',
    },
    {
      icon: FileText,
      label: 'Articles publiés',
      value: publishedPosts[0].count,
      color: 'text-purple-400',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 gold-gradient">
        Vue d'ensemble
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <GlassmorphCard key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={cn('p-3 glass rounded-lg', stat.color)}>
                  <Icon size={24} />
                </div>
              </div>
            </GlassmorphCard>
          );
        })}
      </div>

      {/* Quick Actions */}
      <GlassmorphCard>
        <h2 className="text-xl font-bold mb-6">Actions Rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/clients"
            className="p-4 glass rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            <Users className="mx-auto mb-2" size={24} />
            <p className="text-sm">Gérer les clients</p>
          </a>
          <a
            href="/admin/appointments"
            className="p-4 glass rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            <Calendar className="mx-auto mb-2" size={24} />
            <p className="text-sm">Voir les RDV</p>
          </a>
          <a
            href="/admin/messages"
            className="p-4 glass rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            <MessageSquare className="mx-auto mb-2" size={24} />
            <p className="text-sm">Messages</p>
          </a>
          <a
            href="/admin/blog"
            className="p-4 glass rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            <FileText className="mx-auto mb-2" size={24} />
            <p className="text-sm">Créer un article</p>
          </a>
        </div>
      </GlassmorphCard>
    </div>
  );
}

function cn(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
