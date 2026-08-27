const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'data', 'yfy.db'));
try {
  db.prepare('ALTER TABLE demo_requests ADD COLUMN primary_interest TEXT;').run();
  console.log("Added primary_interest");
} catch(e) {
  console.log(e.message);
}
try {
  db.prepare('ALTER TABLE demo_requests ADD COLUMN message_details TEXT;').run();
  console.log("Added message_details");
} catch(e) {
  console.log(e.message);
}
