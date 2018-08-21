const pgPromise = require('pg-promise');
import { TUtilsConfig } from './types';

import PgpWrapper from './wrapper';

const pgp: pgPromise.IMain = pgPromise({
  noWarnings: true,
});

export const connect = async (connection: TUtilsConfig) => {
  const cn = await pgp(connection);
  const db: pgPromise.IConnected<any> = await cn.connect({ direct: true });
  return new PgpWrapper(db);
};

export const close = (db: pgPromise.IConnected<any>) => {
  db.done();
};
