const { randomBytes } = require('node:crypto');
const { mkdirSync } = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const databasePath = path.join(__dirname, 'login-test-data.sqlite');

function getValidLoginData() {
  mkdirSync(__dirname, { recursive: true });

  const database = new DatabaseSync(databasePath);
  try {
    database.exec(`
      CREATE TABLE IF NOT EXISTS login_test_data (
        case_id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);

    const suffix = `${Date.now()}_${randomBytes(4).toString('hex')}`;
    database.prepare(`
      INSERT INTO login_test_data (case_id, username, password)
      VALUES (?, ?, ?)
      ON CONFLICT(case_id) DO UPDATE SET
        username = excluded.username,
        password = excluded.password
    `).run('valid-login', `pw_user_${suffix}`, `PwTest_${suffix}!`);

    const testData = database.prepare(`
      SELECT username, password
      FROM login_test_data
      WHERE case_id = ?
    `).get('valid-login');

    if (!testData || !testData.username || !testData.password) {
      throw new Error('Could not read valid login credentials from the SQLite test database.');
    }

    return testData;
  } finally {
    database.close();
  }
}

module.exports = { getValidLoginData };
