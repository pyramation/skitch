process.env.SKITCH_PATH = __dirname + '/fixtures/skitch';

import { promisify } from 'util';
import { exec } from 'child_process';
import { resolve as resolvePath } from 'path';
import { TUtilsConfig } from './types';

const asyncExec = promisify(exec);

import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PATH } from 'skitch-env';

import { deploy } from '../index';

const database = 'my-test-module-db';
const pg = require('pg');
let pgPool;

describe('deploy sqitch modules', () => {
  beforeEach(async () => {
    pgPool = new pg.Pool({
      connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${database}`
    });
    try {
      await asyncExec(
        `dropdb -U ${PGUSER} -h ${PGHOST} -p ${PGPORT} ${database}`,
        {
          env: {
            PGPASSWORD,
            PATH
          }
        }
      );
    } catch (e) { }
    await asyncExec(
      `createdb -U ${PGUSER} -h ${PGHOST} -p ${PGPORT} ${database}`,
      {
        env: {
          PGPASSWORD,
          PATH
        }
      }
    );
  });
  afterEach(async () => {
    pgPool.end();
    await asyncExec(
      `dropdb -U ${PGUSER} -h ${PGHOST} -p ${PGPORT} ${database}`,
      {
        env: {
          PGPASSWORD,
          PATH
        }
      }
    );
  });
  it('works', async () => {
    const utils = await deploy('secrets', database);
    const {rows: [{generate_secret: secret}]} = await pgPool.query(`SELECT * FROM generate_secret()`);
    const {rows: [{secretfunction: secret2}]} = await pgPool.query(`SELECT * FROM secretfunction()`);
    expect(secret).toBeTruthy();
    expect(secret2).toBeTruthy();
  });
});
