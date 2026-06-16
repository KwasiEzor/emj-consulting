import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages } from '@/db/schema';
import { contactSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Save to database
    await db.insert(messages).values({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      country: validatedData.country,
      message: validatedData.message,
      isRead: false,
    });

    // TODO: Send email notification (Resend integration)

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}
