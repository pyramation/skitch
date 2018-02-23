import { exec } from 'child_process';
// import { prompt } from 'skitch-prompt';
import skitchPath from 'skitch-path';
const promisify = require('util').promisify;
const fs = require('fs');
const mkdirp = require('mkdirp').sync;
const asyncExec = promisify(exec);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export default async argv => {
  const PKGDIR = await skitchPath();

  // TODO intregrate with "skitch"

  const glob = require('glob').sync;
  const modules = glob(PKGDIR + '/modules/*.js').filter(
    f => !f.match(/bundle\.js/) && !f.match(/.sql$/)
  );
  const path = require('path');

  mkdirp(`${PKGDIR}/deploy/schemas/v8/tables/modules/fixtures`);

  modules.forEach(module => {
    const basename = path.basename(module);
    const name = basename.replace(/\.[^/.]+$/, '');

    console.log(
      `browserify ${module} --s ${name} -o modules/${name}.bundle.js`
    );

    (async () => {
      const deployFile = fs.createWriteStream(
        `${PKGDIR}/deploy/schemas/v8/tables/modules/fixtures/${name}.sql`
      );
      const revertFile = fs.createWriteStream(
        `${PKGDIR}/revert/schemas/v8/tables/modules/fixtures/${name}.sql`
      );
      const verifyFile = fs.createWriteStream(
        `${PKGDIR}/verify/schemas/v8/tables/modules/fixtures/${name}.sql`
      );
      const readStream = fs.createReadStream(
        `${PKGDIR}/modules/${name}.bundle.js`
      );
      const proc = exec(
        `browserify ${module} --s ${name} -o modules/${name}.bundle.js`
      );

      // VERIFY
      verifyFile.write(`-- Verify schemas/v8/tables/modules/fixtures/${name}  on pg

  BEGIN;

  SELECT 1/count(*) FROM v8.modules WHERE name='${name}';

  ROLLBACK;`);
      verifyFile.end();

      // REVERT
      revertFile.write(`-- Revert schemas/v8/tables/modules/fixtures/${name} from pg

  BEGIN;

  DELETE FROM v8.modules WHERE name='${name}';

  COMMIT;`);

      revertFile.end();

      // DEPLOYMENT
      deployFile.write(`-- Deploy schemas/v8/tables/modules/fixtures/${name} to pg

  -- requires: schemas/v8/schema
  -- requires: schemas/v8/tables/modules/table

  BEGIN;

  INSERT INTO v8.modules (name, code) VALUES ('${name}', $code$

    (function () {
      var module = {
        exports: { }
      };
      var exports = module.exports;

      /* plv8 bundle begins */
  `);

      readStream.on('data', chunk => {});
      readStream.on('end', () => {
        deployFile.write(`

      /* plv8 bundle ends */

      return module;
    })();

  $code$);

  COMMIT;`);

        deployFile.end();
      });
      readStream.pipe(deployFile);
    })();
  });
};
