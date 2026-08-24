import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();

    // Log the application for internal tracking
    console.log('--- NEW PARTNER APPLICATION ---');
    console.log('Type:', data.partnerType);
    console.log('Name:', data.name);
    console.log('Email:', data.email);
    console.log('Phone:', data.phone);
    console.log('Company:', data.company);
    if (data.partnerType === 'ca-accountants') {
      console.log('Clients:', data.clientCount);
      console.log('Process:', data.process);
      console.log('Interest:', data.interest);
    }
    console.log('Message:', data.message);
    console.log('-------------------------------');

    /**
     * PRO-TIP: To send actual emails, integrate a service like Resend or Nodemailer here.
     * Example with Resend:
     * 
     * const { data: emailData, error } = await resend.emails.send({
     *   from: 'yfy Partners <partners@yfy.ai>',
     *   to: ['team@yfy.ai'],
     *   subject: `New Partner Application: ${data.name} (${data.partnerType})`,
     *   react: PartnerEmailTemplate(data),
     * });
     */

    return NextResponse.json({ 
      success: true, 
      message: 'Application received successfully' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
