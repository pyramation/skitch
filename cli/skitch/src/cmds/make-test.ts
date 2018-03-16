import skitchPath from 'skitch-path';
import { prompt } from 'inquirerer';
import { basename } from 'path';
const mkdirp = require('mkdirp').sync;
const fs = require('fs');

const questions = [
  {
    name: 'name',
    message: 'test name',
    required: true,
  },
];
export default async argv => {
  const PKGDIR = await skitchPath();
  let { name } = await prompt(questions, argv);

  const template = `jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
import { getConnection, closeConnection, truncateTables } from 'skitch-testing';

let db;

describe('${name}', () => {
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
        \`INSERT INTO schema.table (name) VALUES ($1) RETURNING *\`,
        ['hello world']
      );
      console.log(object);
    });
  });
});`;
  mkdirp(`${PKGDIR}/test/`);
  fs.writeFileSync(`${PKGDIR}/test/${name}.test.js`, template);
};
