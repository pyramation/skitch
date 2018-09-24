import { exec as shellExec } as shell from 'shelljs';
import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PATH } from 'skitch-env';

export const execSync = (cmd, opts) => {
  shellExec(cmd, {
    env: {
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGPORT,
      PATH
    },
    ...opts
  });
};
