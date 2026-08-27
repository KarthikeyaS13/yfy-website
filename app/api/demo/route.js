import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import db from '../../../lib/db';

function getEndTimeStr(timeStr) {
  if (!timeStr) return 'N/A';
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  minutes += 30;
  if (minutes >= 60) {
    hours += 1;
    minutes -= 60;
  }

  const endModifier = hours >= 12 ? 'PM' : 'AM';
  let endHours = hours % 12;
  if (endHours === 0) endHours = 12;

  return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${endModifier}`;
}

function getICSDate(dateStr, timeStr, addMinutes = 0) {
  if (!dateStr || !timeStr) return '';
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  minutes += addMinutes;
  hours += Math.floor(minutes / 60);
  minutes = minutes % 60;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  const isoString = `${dateStr}T${paddedHours}:${paddedMinutes}:00+05:30`;
  const dateObj = new Date(isoString);

  return dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

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
    const { firstName, lastName, workEmail, company, employeeCount, phone, primaryInterest, messageDetails, selectedDate, selectedSlot } = payload;

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
        INSERT INTO demo_requests (first_name, last_name, work_email, company, employee_count, phone, primary_interest, message_details, selected_date, selected_slot)
        VALUES (@firstName, @lastName, @workEmail, @company, @employeeCount, @phone, @primaryInterest, @messageDetails, @selectedDate, @selectedSlot)
      `);
      stmt.run({
        firstName,
        lastName,
        workEmail,
        company,
        employeeCount,
        phone,
        primaryInterest: primaryInterest || null,
        messageDetails: messageDetails || null,
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
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER || 'info@yfy.ai',
          pass: process.env.SMTP_PASS || 'Yfyapp@013',
        },
      });

      const teamMailOptions = {
        from: process.env.SMTP_FROM || '"YFY" <info@yfy.ai>',
        to: process.env.SMTP_USER || 'info@yfy.ai',
        subject: `New Demo Request: ${company}`,
        html: `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${workEmail}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Employee Count:</strong> ${employeeCount}</p>
          <p><strong>Primary Interest:</strong> ${primaryInterest || 'N/A'}</p>
          <p><strong>Message Details:</strong> ${messageDetails || 'N/A'}</p>
          <p><strong>Requested Date:</strong> ${dateStr}</p>
          <p><strong>Requested Time:</strong> ${selectedSlot || 'N/A'}</p>
        `,
      };

      let userMailOptions = {
        from: process.env.SMTP_FROM || '"YFY" <info@yfy.ai>',
        to: workEmail,
        subject: 'Invitation: Consultation Session - YFY',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #6b1fa2;">Hi ${firstName},</h2>
            <p style="line-height: 1.6;">You are invited to a consultation session with YFY. Please use the calendar participation buttons (Yes / Maybe / No) in your email client to confirm your availability.</p>
            
            <div style="background-color: #f9f6fd; border: 1px solid #e9d5ff; border-radius: 8px; padding: 24px; margin: 24px 0;">
              <h3 style="margin-top: 0; color: #4c1d95; font-size: 1.25rem;">Consultation Session - YFY</h3>
              
              <div style="display: flex; margin-bottom: 16px;">
                <div style="margin-right: 12px; font-size: 1.25rem;">📅</div>
                <div>
                  <div style="font-weight: 600; color: #333; margin-bottom: 4px;">Date and time</div>
                  <div style="color: #555;">${dateStr}</div>
                  <div style="color: #555; margin-top: 2px;">${selectedSlot || 'N/A'} - ${getEndTimeStr(selectedSlot)} (IST)</div>
                </div>
              </div>
              
              <div style="display: flex;">
                <div style="margin-right: 12px; font-size: 1.25rem;">👥</div>
                <div>
                  <div style="font-weight: 600; color: #333; margin-bottom: 4px;">Participants</div>
                  <div style="color: #555;">${firstName} ${lastName} (${workEmail})</div>
                  <div style="color: #555; margin-top: 2px;">YFY Team (info@yfy.ai)</div>
                </div>
              </div>
            </div>
            
            <p style="line-height: 1.6; color: #555;">When you respond, your participation status will be directly shared with our team.</p>
            
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 24px 0;" />
            <p style="font-size: 12px; color: #888;">YFY &bull; info@yfy.ai &bull; yfy.ai</p>
          </div>
        `,
      };

      if (formattedTargetDate && selectedSlot) {
        const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YFY//Demo Scheduler//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${Date.now()}@yfy.ai
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${getICSDate(formattedTargetDate, selectedSlot, 0)}
DTEND:${getICSDate(formattedTargetDate, selectedSlot, 30)}
SUMMARY:Consultation Session - YFY
DESCRIPTION:Consultation regarding your requirements with the YFY team.\\n\\nName: ${firstName} ${lastName}\\nCompany: ${company}\\nPrimary Interest: ${primaryInterest || 'N/A'}\\nDetails: ${messageDetails || 'N/A'}
ORGANIZER;CN=YFY:mailto:info@yfy.ai
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${firstName} ${lastName}:mailto:${workEmail}
END:VEVENT
END:VCALENDAR`;

        userMailOptions.icalEvent = {
          filename: 'invite.ics',
          method: 'request',
          content: icalContent
        };
      }

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
