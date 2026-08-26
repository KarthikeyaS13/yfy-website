import fs from 'fs/promises';
import path from 'path';
import db from '../lib/db.js';

async function seed() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'compliance.json');
    const fileContents = await fs.readFile(dataFile, 'utf8');
    const events = JSON.parse(fileContents);

    const insert = db.prepare(`
      INSERT INTO compliance_events (id, title, type, state, due_date_day, description)
      VALUES (@id, @title, @type, @state, @dueDateDay, @description)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        type = excluded.type,
        state = excluded.state,
        due_date_day = excluded.due_date_day,
        description = excluded.description
    `);

    const insertMany = db.transaction((eventsArray) => {
      for (const event of eventsArray) {
        insert.run(event);
      }
    });

    insertMany(events);
    console.log(`Successfully seeded ${events.length} compliance events into SQLite.`);
  } catch (err) {
    console.error("Failed to seed database:", err);
  }
}

seed();
