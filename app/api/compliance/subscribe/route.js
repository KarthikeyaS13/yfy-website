import { NextResponse } from 'next/server';
import getDb from '../../../../lib/db';

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, company, headcount, state } = payload;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = await getDb();
    await db.run(`
      INSERT INTO compliance_subscriptions (name, email, company, headcount, state)
      VALUES (:name, :email, :company, :headcount, :state)
    `, {
      ':name': name || null,
      ':email': email,
      ':company': company || null,
      ':headcount': headcount || null,
      ':state': state || null
    });

    return NextResponse.json({ success: true, message: 'Subscription saved successfully.' });
  } catch (error) {
    console.error("Failed to save compliance subscription", error);
    return NextResponse.json({ error: 'Failed to save subscription.' }, { status: 500 });
  }
}
