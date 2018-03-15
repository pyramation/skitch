const Streamify = require('streamify-string');
import { spawn } from 'child_process';
import { resolve as resolvePath } from 'path';
import { resolve as resolveSql } from './resolve';
import { TUtilsConfig } from './types';

export async function seed(
  { database, host, password, port, user }: TUtilsConfig,
  path: string = process.cwd()
) {
  return new Promise(resolve => {
    const proc = spawn('sqitch', ['deploy', `db:pg:${database}`], {
      cwd: resolvePath(path),
      env: Object.assign({}, process.env, {
        PGPASSWORD: password,
        PGUSER: user,
        PGHOST: host,
        PGPORT: port,
      }),
    });
    proc.on('close', code => {
      resolve();
    });
  });
}

export const setArgs = (config: TUtilsConfig) => {
  let args: string[] = [];

  args = Object.entries({
    '-U': config.user,
    '-h': config.host,
    '-p': config.port,
  }).reduce((args, [key, value]) => {
    if (value) args.push(key, `${value}`);
    return args;
  }, args);

  if (config.database) args.push(config.database);
  return args;
};

export async function hotSeed(
  config: TUtilsConfig,
  path: string = process.cwd()
) {
  const args = setArgs(config);
  // why had to use object, unsure

  return new Promise(async resolve => {
    const sql = await resolveSql(path);
    const str = new Streamify(sql);

    const proc = spawn('psql', args, {
      env: { ...process.env, PGPASSWORD: config.password },
    });

    str.pipe(proc.stdin);
    proc.on('close', code => {
      resolve();
    });
  });
}
