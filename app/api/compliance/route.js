import { NextResponse } from 'next/server';
import getDb from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const events = await db.all('SELECT * FROM compliance_events');
    
    // SQLite returns column names exactly as they are in DB (due_date_day).
    // The frontend expects `dueDateDay`. Let's map it.
    const mappedEvents = events.map(evt => ({
      id: evt.id,
      title: evt.title,
      type: evt.type,
      state: evt.state,
      dueDateDay: evt.due_date_day,
      description: evt.description
    }));

    return NextResponse.json(mappedEvents);
  } catch (error) {
    console.error("Failed to read from compliance_events", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== 'Bearer yfyadmin2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    
    if (!Array.isArray(payload)) {
      return NextResponse.json({ error: 'Payload must be an array of compliance dates.' }, { status: 400 });
    }

    const db = await getDb();
    
    await db.run('BEGIN TRANSACTION');
    try {
      for (const event of payload) {
        await db.run(`
          INSERT INTO compliance_events (id, title, type, state, due_date_day, description)
          VALUES (:id, :title, :type, :state, :dueDateDay, :description)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            type = excluded.type,
            state = excluded.state,
            due_date_day = excluded.due_date_day,
            description = excluded.description
        `, {
          ':id': event.id,
          ':title': event.title,
          ':type': event.type,
          ':state': event.state,
          ':dueDateDay': event.dueDateDay,
          ':description': event.description
        });
      }
      await db.run('COMMIT');
    } catch (e) {
      await db.run('ROLLBACK');
      throw e;
    }

    return NextResponse.json({ success: true, message: 'Compliance data updated successfully.' });
  } catch (error) {
    console.error("Failed to write to compliance_events", error);
    return NextResponse.json({ error: 'Failed to update compliance data.' }, { status: 500 });
  }
}
