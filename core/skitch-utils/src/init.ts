import 'skitch-template';
import { promisify } from 'util';
import { exec } from 'child_process';
import { sqitchPath as path, skitchPath as sPath } from './paths';
import { dirname, basename } from 'path';
import * as shell from 'shelljs';
import { writeFileSync } from 'fs';
const srcPath = dirname(require.resolve('skitch-template'));
import { makePlan } from './plans';

// import plan from './plan';

const makePackage = ({ name, description, author }) => {
  return {
    name,
    version: '0.0.1',
    description,
    author,
    private: true,
    scripts: {
      test: 'FAST_TEST=1 skitch-templatedb && jest',
      'test:watch': 'FAST_TEST=1 jest --watch',
    },
    devDependencies: {
      '@types/jest': '21.1.0',
      '@types/node': '8.0.0',
      'babel-cli': '6.24.1',
      'babel-jest': '20.0.3',
      'babel-preset-react-app': '3.0.0',
      dotenv: '5.0.1',
      jest: '20.0.4',
    },
    dependencies: {
      pg: '6.4.0',
      'pg-promise': '6.10.3',
      'skitch-testing': 'latest',
      uuid: '3.1.0',
    },
  };
};

const sluggify = (text) => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export const init = async ({ name, description, author, extensions }) => {

  await sPath();

  // init sqitch

  const cmd = ['sqitch', 'init', name, '--engine', 'pg'].join(' ');
  await promisify(exec)(cmd.trim());

  // now we have a sqitch path!

  const sqitchPath = await path();
  const pkg = makePackage({ name, description, author });

  // initialize template
  shell.cp('-r', `${srcPath}/sqitch/*`, `${sqitchPath}/`);
  shell.cp('-r', `${srcPath}/sqitch/.*`, `${sqitchPath}/`);

  shell.mkdir('-p', `${sqitchPath}/sql`);
  const extname = sluggify(name);

  writeFileSync(`${sqitchPath}/Makefile`, `EXTENSION = ${extname}
DATA = sql/${extname}--0.0.1.sql

PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)
  `);

  writeFileSync(`${sqitchPath}/${extname}.control`, `# ${extname} extension
comment = '${description}'
default_version = '0.0.1'
module_pathname = '$libdir/${extname}'
requires = '${extensions.join(',')}'
relocatable = false
superuser = false
  `);

  writeFileSync(`${sqitchPath}/package.json`, JSON.stringify(pkg, null, 2));

  const settings = {
    name,
    // projects: true
  };

  // const plan = await makePlan(sqitchPath, settings);
  // fs.writeFileSync(`${sqitchPath}/sqitch.plan`, plan);

  console.log(`

        |||
       (o o)
   ooO--(_)--Ooo-


✨ ${name} created!

Now try this:

skitch generate

`);
};

export const initSkitch = async () => {

  const dir = process.cwd();
  shell.cp('-r', `${srcPath}/skitch/*`, `${dir}/`);
  shell.cp('-r', `${srcPath}/skitch/.*`, `${dir}/`);

  console.log(`

        |||
       (o o)
   ooO--(_)--Ooo-


✨ Great work! Now, try this:

cd packages/
mkdir myfirstmodule
cd myfirstmodule/
skitch init
`);

};
