const v4 = require('uuid/v4');
import { IConnected } from 'pg-promise';
import { createdb, dropdb, templatedb } from './db';
import { sqitchFast, sqitch } from './sqitch';
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

export const getOpts = async configOpts => {
  const { PGUSER, PGPASSWORD, PGPORT, PGHOST, FAST_TEST } = process.env;
  configOpts = configOpts || {};
  let {
    user = PGUSER,
    password = PGPASSWORD,
    port = PGPORT,
    host = PGHOST,
    hot = FAST_TEST,
    template,
    prefix = 'testing-db',
    directory,
  } = configOpts;

  if (!directory && !template) {
    directory = await skitchPath();
  } else if (directory) {
    directory = pathResolve(directory);
  }

  return {
    user,
    password,
    port,
    host,
    hot,
    template,
    prefix,
    directory,
  };
};

export const getConnection = async (configOpts, database) => {
  configOpts = await getOpts(configOpts);

  const {
    user,
    password,
    port,
    host,
    hot,
    template,
    prefix,
    directory,
  } = configOpts;

  if (!database) {
    database = `${prefix}-${v4()}`;
  }
  const connection = {
    database,
    user,
    port,
    password,
    host,
  };

  if (hot) {
    await createdb(connection);
    await sqitchFast(connection, directory);
  } else if (template) {
    await templatedb({ ...connection, template });
  } else {
    await createdb(connection);
    await sqitch(connection, directory);
  }
  const db = await connect(connection);
  return db;
};

export const closeConnection = async (db: IConnected<any>) => {
  const { connectionParameters } = db.client;
  close(db);
  await dropdb(connectionParameters);
};

export const truncateTables = async (db: IConnected<any>) => {
  await db.any("SELECT truncate_tables(ARRAY['v8'])");
};
