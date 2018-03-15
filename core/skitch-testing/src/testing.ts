const v4 = require('uuid/v4');
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

const { PGUSER, PGPASSWORD, PGPORT, PGHOST } = process.env;

export const getConnection = async ({
  user = PGUSER,
  password = PGPASSWORD,
  port = PGPORT,
  host = PGHOST,
  hot,
  template,
  prefix = 'testing-db',
  directory = process.cwd(),
}: TestOptions) => {
  const database = `${prefix}-${v4()}`;
  const connection = Object.assign(
    {
      database,
    },
    {
      user,
      port,
      password,
      host,
    }
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

export const closeConnection = async (db: IConnected<any>) => {
  const { connectionParameters } = db.client;
  close(db);
  await dropdb(connectionParameters);
};
