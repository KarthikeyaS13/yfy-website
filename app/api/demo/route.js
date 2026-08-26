import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import db from '../../../lib/db';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT selected_date, selected_slot FROM demo_requests WHERE selected_date IS NOT NULL AND selected_slot IS NOT NULL');
    const bookings = stmt.all();
    
    // Map it to camelCase for the frontend
    const mappedBookings = bookings.map(b => ({
      scheduledDate: b.selected_date,
      scheduledTime: b.selected_slot
    }));
    
    return NextResponse.json(mappedBookings);
  } catch (error) {
    console.error("Failed to read existing bookings", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { firstName, lastName, workEmail, company, employeeCount, phone, selectedDate, selectedSlot } = payload;

    // 1. Save into Database (Robustness First)
    let dateStr = selectedDate ? new Date(selectedDate).toDateString() : 'N/A';
    
    // Convert full ISO string to YYYY-MM-DD for easier filtering logic on the frontend if needed
    // But since the frontend uses JS Date parsing, passing ISO or date string is fine. 
    // To maintain compatibility with frontend `existingBookings.filter(b => b.scheduledDate === targetDateStr)`,
    // let's format it as YYYY-MM-DD
    let formattedTargetDate = null;
    if (selectedDate) {
      const d = new Date(selectedDate);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      formattedTargetDate = `${year}-${month}-${day}`;
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO demo_requests (first_name, last_name, work_email, company, employee_count, phone, selected_date, selected_slot)
        VALUES (@firstName, @lastName, @workEmail, @company, @employeeCount, @phone, @selectedDate, @selectedSlot)
      `);
      stmt.run({
        firstName,
        lastName,
        workEmail,
        company,
        employeeCount,
        phone,
        selectedDate: formattedTargetDate,
        selectedSlot
      });
    } catch (dbError) {
      console.error("Failed to save demo request to SQLite", dbError);
      return NextResponse.json({ error: 'Failed to save request to database.' }, { status: 500 });
    }

    // 2. Try to send email (Graceful Degradation)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.zoho.in',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER || 'info@yfy.ai',
          pass: process.env.EMAIL_PASS || 'UirHBAuT5ztk',
        },
      });

      const teamMailOptions = {
        from: process.env.EMAIL_FROM || '"YFY" <info@yfy.ai>',
        to: process.env.EMAIL_USER || 'info@yfy.ai',
        subject: `New Demo Request: ${company}`,
        html: `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${workEmail}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Employee Count:</strong> ${employeeCount}</p>
          <p><strong>Requested Date:</strong> ${dateStr}</p>
          <p><strong>Requested Time:</strong> ${selectedSlot || 'N/A'}</p>
        `,
      };

      const userMailOptions = {
        from: process.env.EMAIL_FROM || '"YFY" <info@yfy.ai>',
        to: workEmail,
        subject: 'Demo Request Received - YFY',
        html: `
          <h2>Thank You, ${firstName}!</h2>
          <p>We have received your demo request for <strong>${company}</strong>.</p>
          <p>You have selected the following time for your consultation:</p>
          <p><strong>Date:</strong> ${dateStr}</p>
          <p><strong>Time:</strong> ${selectedSlot || 'N/A'}</p>
          <p>Our compliance experts will review your request and send you a calendar invitation shortly.</p>
          <br/>
          <p>Best regards,<br/>The YFY Team</p>
        `,
      };

      await transporter.sendMail(teamMailOptions);
      await transporter.sendMail(userMailOptions);
    } catch (emailError) {
      // Log email error, but DO NOT fail the request since it's stored in the database!
      console.error('Error sending demo email, but request was saved in DB:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Request processed successfully.' });
  } catch (error) {
    console.error('Unexpected error in Demo API:', error);
    return NextResponse.json({ error: 'Unexpected error occurred.' }, { status: 500 });
  }
}
