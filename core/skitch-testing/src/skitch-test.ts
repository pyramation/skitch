export interface TestOptions {
  user?: string;
  password?: string;
  port?: string;
  host?: string;
  hot?: boolean;
  template?: string;
  prefix?: string;
  directory?: string;
}

import { getOpts, getConnection, closeConnection } from './testing';
import { setTemplate } from './utils';
import { close } from './connection';
import { dropdb } from './db';

export class TestDatabase {
  constructor(public options: object = {}) {
    // this.dbs = [];
  }
  async init(extensions = []) {
    if (!process.env.PGTEMPLATE_DATABASE) {
      throw new Error('no PGTEMPLATE_DATABASE defined in env!');
    }
    this.config = await getOpts(this.options);
    if (!this.config.template) {
      const config = {
        ...this.config,
        extensions
      };
      const templatedb = await getConnection(
        config,
        process.env.PGTEMPLATE_DATABASE
      );
      close(templatedb);

      const { connectionParameters } = templatedb.client;
      this.templateConfig = connectionParameters;
      await setTemplate(this.config, this.templateConfig.database);
    }
  }
  async getConnection() {
    const db = await getConnection({
      ...this.config,
      template: this.templateConfig.database
    });
    // this.dbs.push(db);
    return db;
  }
  async close() {
    await dropdb(this.templateConfig);
  }
}
