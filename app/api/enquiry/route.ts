import { NextRequest, NextResponse } from 'next/server';

// MERIDIAN enquiry API — temporary dev implementation
// Connect to email/CRM here when credentials are available.
// In production, replace the console.log below with your provider call.

interface EnquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  collection: string;
  period: string;
  travellingWith: string;
  message: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Partial<EnquiryPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { firstName, lastName, email, message } = body;

  if (!firstName?.trim()) {
    return NextResponse.json({ field: 'firstName', error: 'Please enter your first name.' }, { status: 422 });
  }
  if (!lastName?.trim()) {
    return NextResponse.json({ field: 'lastName', error: 'Please enter your family name.' }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ field: 'email', error: 'Please enter a valid email address.' }, { status: 422 });
  }
  if (!message || message.trim().length < 10) {
    return NextResponse.json({ field: 'message', error: 'Please write a short message (at least 10 characters).' }, { status: 422 });
  }

  // Log in development only — remove before production
  if (process.env.NODE_ENV === 'development') {
    console.log('[MERIDIAN enquiry]', { firstName, lastName, email, collection: body.collection, period: body.period });
  }

  // TODO: connect to email provider (e.g. Resend, SendGrid) or CRM here
  // await sendEmail({ to: 'concierge@meridian.com', ...body });

  return NextResponse.json({ success: true }, { status: 200 });
}
