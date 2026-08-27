import fs from 'fs/promises';
import path from 'path';
import getDb from '../lib/db.js';

async function seed() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'compliance.json');
    const fileContents = await fs.readFile(dataFile, 'utf8');
    const events = JSON.parse(fileContents);

    const db = await getDb();
    
    await db.run('BEGIN TRANSACTION');
    try {
      for (const event of events) {
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
      console.log(`Successfully seeded ${events.length} compliance events into SQLite.`);
    } catch (e) {
      await db.run('ROLLBACK');
      throw e;
    }
  } catch (err) {
    console.error("Failed to seed database:", err);
  }
}

seed();
