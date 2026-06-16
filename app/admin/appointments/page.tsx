import { db } from '@/db';
import { appointments, services } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { Calendar, Clock, Mail, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default async function AppointmentsPage() {
  const allAppointments = await db
    .select({
      appointment: appointments,
      service: services,
    })
    .from(appointments)
    .leftJoin(services, eq(appointments.serviceId, services.id))
    .orderBy(desc(appointments.createdAt));

  const statusConfig = {
    pending: { label: 'En attente', icon: AlertCircle, color: 'text-yellow-400' },
    confirmed: { label: 'Confirmé', icon: CheckCircle, color: 'text-green-400' },
    completed: { label: 'Terminé', icon: CheckCircle, color: 'text-blue-400' },
    cancelled: { label: 'Annulé', icon: XCircle, color: 'text-red-400' },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 gold-gradient">Rendez-vous</h1>

      <div className="space-y-4">
        {allAppointments.map(({ appointment, service }) => {
          const status = statusConfig[appointment.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;

          return (
            <GlassmorphCard key={appointment.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="font-bold text-lg">{appointment.name}</h3>
                    <span className={`flex items-center text-sm ${status.color}`}>
                      <StatusIcon size={16} className="mr-1" />
                      {status.label}
                    </span>
                  </div>

                  {service && (
                    <div className="mb-3">
                      <span className="text-sm px-3 py-1 glass rounded-full text-[var(--color-gold)]">
                        {service.icon} {service.titleFr}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <Mail size={14} className="mr-1" />
                      {appointment.email}
                    </div>
                    {appointment.phone && (
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1" />
                        {appointment.phone}
                      </div>
                    )}
                  </div>

                  {appointment.notes && (
                    <p className="text-white/70 text-sm">
                      <span className="font-semibold">Notes:</span> {appointment.notes}
                    </p>
                  )}
                </div>
              </div>
            </GlassmorphCard>
          );
        })}

        {allAppointments.length === 0 && (
          <div className="text-center py-20 text-white/40">
            Aucun rendez-vous
          </div>
        )}
      </div>
    </div>
  );
}
