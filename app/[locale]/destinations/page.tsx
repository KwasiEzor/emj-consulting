import { db } from '@/db';
import { destinations } from '@/db/schema';
import { DestinationsClient } from '@/components/destinations/DestinationsClient';

export default async function DestinationsPage() {
  const allDestinations = await db.select().from(destinations).orderBy(destinations.order);

  return (
    <div className="container mx-auto px-4 py-20">
      <DestinationsClient destinations={allDestinations} />
    </div>
  );
}
