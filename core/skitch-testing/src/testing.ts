const v4 = require('uuid/v4');
import { IConnected } from 'pg-promise';
import { createdb, dropdb, templatedb } from './db';
import { hotSeed, seed } from './seed';
import skitchPath from 'skitch-path';
import { connect, close } from './connection';
import { TUtilsConfig } from './types';
import { resolve as pathResolve } from 'path';
export interface TestOptions {
  hot?: boolean;
  directory?: string;
  prefix?: string;
  template?: string;
}

export const getConnection = async configOpts => {
  const { PGUSER, PGPASSWORD, PGPORT, PGHOST, FAST_TEST } = process.env;
  configOpts = configOpts || {};
  const {
    user = PGUSER,
    password = PGPASSWORD,
    port = PGPORT,
    host = PGHOST,
    hot = FAST_TEST,
    template,
    prefix = 'testing-db',
    directory,
  } = configOpts;

  if (!directory) {
    directory = await skitchPath();
  } else {
    directory = pathResolve(directory);
  }

  const database = `${prefix}-${v4()}`;
  const connection = {
    database,
    user,
    port,
    password,
    host,
  };

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
