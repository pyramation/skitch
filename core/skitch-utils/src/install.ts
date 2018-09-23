import { promisify } from 'util';
import { resolve } from 'path';
var mkdirp = require('mkdirp').sync;

import { exec } from 'shelljs';

import { writeFileSync } from 'fs';

const TMPDIR = process.env.TMPDIR;
const rnd = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export const install = async (name, version = 'latest') => {
  const path = resolve(`${TMPDIR}/${rnd()}`);
  var options = {
    name,
    version,
    path
  };

  mkdirp(path);
  process.chdir(path);
  writeFileSync(
    `${path}/package.json`,
    JSON.stringify(
      {
        name: rnd()
      },
      null,
      2
    )
  );

  exec(`npm install ${name} --production`);
};
