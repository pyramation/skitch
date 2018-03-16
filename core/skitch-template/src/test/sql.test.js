jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
import { getConnection, closeConnection, truncateTables } from 'skitch-testing';

let db;

describe('custom database test', () => {
  beforeAll(async () => {
    db = await getConnection();
  });
  afterAll(async () => {
    await closeConnection(db);
  });
  afterEach(async () => {
    await truncateTables(db);
  });
  describe('has a database', () => {
    it('it works', async () => {
      const [object] = await db.any(
        `INSERT INTO objects.object (type, data) VALUES ($1, $2::JSON) RETURNING *`,
        ['commit', { hello: 'world' }]
      );
      console.log(object);
    });
  });
});
