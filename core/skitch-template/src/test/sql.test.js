jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
import { resolve as pathResolve } from 'path';
import { getConnection, closeConnection } from 'skitch-testing';

let db;

describe('custom database fields', () => {
  beforeAll(async () => {
    db = await getConnection({
      hot: true,
      directory: pathResolve(__dirname + '/../'),
    });
  });
  afterAll(async () => {
    await closeConnection(db);
  });
  afterEach(async () => {
    await db.any("SELECT truncate_tables(ARRAY['v8'])");
  });
  describe('has a database', () => {
    it('works', async () => {
      const [object] = await db.any(
        `INSERT INTO objects.object (type, data) VALUES ($1, $2::JSON) RETURNING *`,
        ['commit', { hello: 'world' }]
      );
      console.log(object);
    });
  });
});
