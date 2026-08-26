import Database from 'better-sqlite3';
import path from 'path';

// Define the path to the SQLite database file
const dbPath = path.join(process.cwd(), 'data', 'yfy.db');

// Initialize the database connection
const db = new Database(dbPath);
db.pragma('journal_mode = WAL'); // Enable Write-Ahead Logging for better performance

// Create tables if they do not exist
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      work_email TEXT,
      company TEXT,
      employee_count TEXT,
      phone TEXT,
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
};

initDb();

export default db;
