import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Define the path to the SQLite database file
const dbPath = path.join(process.cwd(), 'data', 'yfy.db');

let dbPromise = null;

// Initialize the database connection
const getDb = async () => {
  if (!dbPromise) {
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    dbPromise = open({
      filename: dbPath,
      driver: sqlite3.Database
    }).then(async (db) => {
      await db.exec('PRAGMA journal_mode = WAL;'); // Enable Write-Ahead Logging for better performance

      // Create tables if they do not exist
      await db.exec(`
        CREATE TABLE IF NOT EXISTS demo_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT,
          last_name TEXT,
          work_email TEXT,
          company TEXT,
          employee_count TEXT,
          phone TEXT,
          primary_interest TEXT,
          message_details TEXT,
          selected_date TEXT,
          selected_slot TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS compliance_events (
          id TEXT PRIMARY KEY,
          title TEXT,
          type TEXT,
          state TEXT,
          due_date_day INTEGER,
          description TEXT
        );

        CREATE TABLE IF NOT EXISTS compliance_subscriptions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          company TEXT,
          headcount TEXT,
          state TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
      return db;
    });
  }
  return dbPromise;
};

export default getDb;
