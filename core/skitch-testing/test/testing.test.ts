import { IConnected } from 'pg-promise';
import v4 from 'uuid/v4';
import {
  close,
  connect,
  getConnection,
  closeConnection,
  dropdb,
} from '../index';
import {
  getConnObj,
  getConnStr,
  cleanup,
  verifydb,
  expectBasicSeed,
  config,
} from './utils';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();

let db: IConnected<any>;

describe('testing', () => {
  afterEach(async () => {
    await closeConnection(db);
  });

  it('hot seed option', async () => {
    db = await getConnection({
      ...config,
      hot: true,
      directory: __dirname + '/fixtures/basic',
    });
    await expectBasicSeed(db);
  });
  it('hot seed option prefix', async () => {
    const dir = process.cwd();
    process.chdir(__dirname + '/fixtures/basic');
    db = await getConnection({
      ...config,
      hot: true,
      prefix: 'testing-another-',
    });
    await expectBasicSeed(db);
    process.chdir(dir);
  });
  it('sqitch seed option', async () => {
    db = await getConnection({
      ...config,
      directory: __dirname + '/fixtures/basic',
    });
    await expectBasicSeed(db);
  });
  it('sqitch seed option prefix', async () => {
    const dir = process.cwd();
    process.chdir(__dirname + '/fixtures/basic');
    db = await getConnection({
      ...config,
      prefix: 'testing-another-',
    });
    await expectBasicSeed(db);
    process.chdir(dir);
  });
});
describe('templatedb', () => {
  it('template option', async () => {
    const templatedb = await getConnection({
      ...config,
      hot: true,
      directory: __dirname + '/fixtures/basic',
    });
    await expectBasicSeed(templatedb);
    close(templatedb);

    const { connectionParameters } = templatedb.client;

    db = await getConnection({
      ...config,
      template: connectionParameters.database,
    });

    // without inserting, expect data to be there already
    expect(await db.any(`SELECT * FROM myschema.sometable`)).toEqual([
      { id: 1, name: 'joe' },
      { id: 2, name: 'steve' },
      { id: 3, name: 'mary' },
      { id: 4, name: 'rachel' },
    ]);

    {
      await dropdb(connectionParameters);
    }

    await closeConnection(db);
  });
});