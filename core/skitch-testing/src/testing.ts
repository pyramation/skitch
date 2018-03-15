import * as v4 from 'uuid/v4';
import { IConnected } from 'pg-promise';
import { createdb, dropdb, templatedb } from './db';
import { hotSeed, seed } from './seed';
import { connect, close } from './connection';
import { TUtilsConfig } from './types';

export interface TestOptions {
  hot?: boolean;
  directory?: string;
  prefix?: string;
  template?: string;
}

export const connectTestDb = async (
  config: TUtilsConfig,
  {
    hot,
    template,
    prefix = 'testing-db',
    directory = process.cwd(),
  }: TestOptions
) => {
  const database = `${prefix}-${v4()}`;
  const connection = Object.assign(
    {
      database,
    },
    config
  );

  if (hot) {
    await createdb(connection);
    await hotSeed(connection, directory);
  } else if (template) {
    await templatedb({ ...connection, template });
  } else {
    await createdb(connection);
    await seed(connection, directory);
  }
  const db = await connect(connection);
  return db;
};

export const closeTestDb = async (db: IConnected<any>) => {
  const { connectionParameters } = db.client;
  close(db);
  await dropdb(connectionParameters);
};

export const truncateTables = async (db: IConnected<any>) => {
  const query = `SELECT
     CONCAT(table_schema, '.', table_name) as table
     FROM   information_schema.tables
     WHERE table_schema != 'information_schema'
     AND table_schema != 'pg_catalog'
     AND table_schema != 'sqitch';`;
  const names = await db.any(query);
  console.log(`TRUNCATE TABLE ${names.join(',')};`);
};
