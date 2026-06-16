import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { appointmentSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = appointmentSchema.parse(body);

    // Save to database
    await db.insert(appointments).values({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceId: validatedData.serviceId,
      date: validatedData.date,
      time: validatedData.time,
      notes: validatedData.notes || null,
      status: 'pending',
    });

    // TODO: Send confirmation email (Resend integration)

    return NextResponse.json(
      { success: true, message: 'Rendez-vous confirmé' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Appointment error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la réservation' },
      { status: 500 }
    );
  }
}
