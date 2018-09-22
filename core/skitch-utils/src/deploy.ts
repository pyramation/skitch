import * as shell from 'shelljs';
import { resolve } from 'path';

import { listModules, getExtensionsAndModules } from './modules';

import { skitchPath } from './paths';

import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PATH } from 'skitch-env';

const pg = require('pg');

// should we be parsing the plan file?
// currently assuming only extensions in control file...

export const deploy = async (name, database, opts) => {
  const path = await skitchPath();
  const modules = await listModules();
  const extensions = await getExtensionsAndModules(name);

  const pgPool = new pg.Pool({
    connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${database}`
  });
  for (let n = 0; n < extensions.native.length; n++) {
    const extension = extensions.native[n];
    console.log(`CREATE EXTENSION IF NOT EXISTS "${extension}" CASCADE;`);
    await pgPool.query(
      `CREATE EXTENSION IF NOT EXISTS "${extension}" CASCADE;`
    );
  }
  pgPool.end();

  for (let n = 0; n < extensions.sqitch.length; n++) {
    const extension = extensions.sqitch[n];
    await deploy(extension, database, opts);
  }

  console.log(modules[name].path);
  console.log(`sqitch deploy db:pg:${database}`);
  shell.exec(`sqitch deploy db:pg:${database}`, {
    cwd: resolve(path, modules[name].path),
    env: {
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGPORT,
      PATH
    }
  });

  return extensions;
};
