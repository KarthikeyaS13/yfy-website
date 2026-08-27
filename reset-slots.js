const db = require('better-sqlite3')('./data/yfy.db');

console.log('Resetting schedule times...');
db.prepare('DELETE FROM demo_requests').run();
console.log('Successfully cleared all demo requests! You can now check fresh slots.');
