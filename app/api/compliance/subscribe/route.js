import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, company, headcount, state } = payload;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO compliance_subscriptions (name, email, company, headcount, state)
      VALUES (@name, @email, @company, @headcount, @state)
    `);

    stmt.run({
      name: name || null,
      email,
      company: company || null,
      headcount: headcount || null,
      state: state || null
    });

    return NextResponse.json({ success: true, message: 'Subscription saved successfully.' });
  } catch (error) {
    console.error("Failed to save compliance subscription", error);
    return NextResponse.json({ error: 'Failed to save subscription.' }, { status: 500 });
  }
}
