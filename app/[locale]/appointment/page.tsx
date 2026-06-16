import { db } from '@/db';
import { services } from '@/db/schema';
import { AppointmentClient } from '@/components/appointment/AppointmentClient';

export default async function AppointmentPage() {
  const allServices = await db.select().from(services).orderBy(services.order);

  return (
    <div className="container mx-auto px-4 py-20">
      <AppointmentClient services={allServices} />
    </div>
  );
}
