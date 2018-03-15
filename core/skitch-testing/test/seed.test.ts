import { seed, hotSeed } from '../src/seed';
import v4 from 'uuid/v4';
import {
  connectionString,
  createdb,
  dropdb,
  setArgs,
  templatedb,
  TUtilsConfig,
} from '../index';
import pgPromise from 'pg-promise';
import { config, getConnStr, expectBasicSeed } from './utils';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();

const pgp = pgPromise({
  noWarnings: true,
});

describe('seed', () => {
  let database;
  let opts: TUtilsConfig;

  beforeEach(async () => {
    database = `testing-db-${v4()}`;
    opts = {
      database,
      ...config,
    };
    await createdb(opts);
  });

  afterEach(async () => {
    await dropdb(opts);
  });

  it('seed', async () => {
    await seed(opts, __dirname + '/fixtures/basic');

    const cn = await pgp(opts);
    const db = await cn.connect({ direct: true });

    await expectBasicSeed(db);

    db.done();
  });

  it('seed II', async () => {
    const dir = process.cwd();
    process.chdir(__dirname + '/fixtures/basic');
    await seed(opts);

    const cn = await pgp(opts);
    const db = await cn.connect({ direct: true });

    await expectBasicSeed(db);

    db.done();
    process.chdir(dir);
  });

  it('hotSeed', async () => {
    await hotSeed(opts, __dirname + '/fixtures/basic');

    const cn = await pgp(opts);
    const db = await cn.connect({ direct: true });

    await expectBasicSeed(db);

    db.done();
  });

  it('hotSeed II', async () => {
    const dir = process.cwd();
    process.chdir(__dirname + '/fixtures/basic');
    await hotSeed(opts);

    const cn = await pgp(opts);
    const db = await cn.connect({ direct: true });

    await expectBasicSeed(db);

    db.done();
    process.chdir(dir);
  });

  it('can setArgs', () => {
    expect(setArgs({ host: 'localhost' })).toEqual(['-h', 'localhost']);
  });
});
