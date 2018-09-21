import { spawn } from 'child_process';
import { resolve as resolvePath } from 'path';
import { resolve as resolveSql } from 'skitch-utils';
import { streamSql } from './utils';
import { TUtilsConfig } from './types';

export async function sqitch(
  { database, host, password, port, user }: TUtilsConfig,
  path: string = process.cwd(),
  scriptType = 'deploy'
) {
  return new Promise(resolve => {
    const proc = spawn('sqitch', [scriptType, `db:pg:${database}`], {
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

export async function sqitchFast(
  config: TUtilsConfig,
  path: string = process.cwd(),
  scriptType = 'deploy'
) {
  const sql = await resolveSql(path, scriptType);
  await streamSql(config, sql);
}
