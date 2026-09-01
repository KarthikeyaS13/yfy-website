import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'yfy.db');

// Cache the database connection on the global object in development
// to prevent memory leaks caused by Next.js Hot Module Replacement (HMR)
// creating endless new connections every time a file changes.
let dbPromise = globalThis._sqliteDbPromise2 || null;

const getDb = async () => {
  if (!dbPromise) {
    const dataDir = path.dirname(dbPath);

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    dbPromise = open({
      filename: dbPath,
      driver: sqlite3.Database,
    }).then(async (db) => {
      await db.exec('PRAGMA journal_mode = WAL;');

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

        /*
         * AI conversation history
         *
         * Stores the actual conversation between a visitor
         * and the yfy.ai assistant.
         */
        CREATE TABLE IF NOT EXISTS ai_conversations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT NOT NULL,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        /*
         * Long-term AI memories
         *
         * Stores useful information that can help the
         * assistant give better answers in future conversations.
         */
        CREATE TABLE IF NOT EXISTS ai_memories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT NOT NULL,
          memory TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_ai_conversations_session
        ON ai_conversations(session_id);

        CREATE INDEX IF NOT EXISTS idx_ai_memories_session
        ON ai_memories(session_id);

        /*
         * Conversion Leads
         * Stores 2-step form submissions for Exposure Report and Compliance Proof Pack
         */
        CREATE TABLE IF NOT EXISTS conversion_leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          lead_type TEXT,
          full_name TEXT,
          work_email TEXT,
          phone TEXT,
          company_name TEXT,
          persona TEXT,
          lead_score TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          utm_source TEXT,
          utm_medium TEXT,
          utm_campaign TEXT,
          referrer TEXT,
          landing_page TEXT,
          page_variant TEXT,
          
          -- Exposure Report Fields
          job_title TEXT,
          industry TEXT,
          own_employees TEXT,
          contract_workers TEXT,
          num_contractors TEXT,
          states_operating TEXT,
          num_sites TEXT,
          monthly_contractor_spend TEXT,
          attendance_capture TEXT,
          challans_collected TEXT,
          current_approach TEXT,
          trigger TEXT,
          can_share_data TEXT,
          notes TEXT,
          
          -- Compliance Proof Pack Fields
          service_type TEXT,
          deployed_workers TEXT,
          num_clients TEXT,
          client_profile TEXT,
          clients_audit_compliance TEXT,
          days_to_invoice TEXT,
          attendance_method TEXT,
          current_systems TEXT,
          biggest_pain TEXT,
          
          -- Common Consent
          consent TEXT
        );
      `);

      return db;
    });

    if (process.env.NODE_ENV !== 'production') {
      globalThis._sqliteDbPromise2 = dbPromise;
    }
  }

  return dbPromise;
};

export default getDb;
