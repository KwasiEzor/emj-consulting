import { db } from '@/db';
import { messages } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { formatDate } from '@/lib/utils';
import { Mail, MailOpen, Phone, MapPin } from 'lucide-react';

export default async function MessagesPage() {
  const allMessages = await db.select().from(messages).orderBy(desc(messages.createdAt));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 gold-gradient">Messages</h1>

      <div className="space-y-4">
        {allMessages.map((message) => (
          <GlassmorphCard key={message.id} className={!message.isRead ? 'border-l-4 border-[var(--color-gold)]' : ''}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {message.isRead ? (
                    <MailOpen size={20} className="text-white/40" />
                  ) : (
                    <Mail size={20} className="text-[var(--color-gold)]" />
                  )}
                  <h3 className="font-bold text-lg">{message.name}</h3>
                  {!message.isRead && (
                    <span className="px-2 py-1 text-xs bg-[var(--color-gold)] text-[var(--color-navy)] rounded">
                      Nouveau
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center">
                    <Mail size={14} className="mr-1" />
                    {message.email}
                  </div>
                  {message.phone && (
                    <div className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      {message.phone}
                    </div>
                  )}
                  {message.country && (
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {message.country}
                    </div>
                  )}
                </div>

                <p className="text-white/80 mb-4">{message.message}</p>

                <p className="text-xs text-white/40">
                  {formatDate(message.createdAt!, 'fr')}
                </p>
              </div>
            </div>
          </GlassmorphCard>
        ))}

        {allMessages.length === 0 && (
          <div className="text-center py-20 text-white/40">
            Aucun message
          </div>
        )}
      </div>
    </div>
  );
}
