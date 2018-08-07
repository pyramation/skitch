import * as shell from 'shelljs';
import path from 'skitch-path';

// TODO move resolve to skitch-utils
import { resolve } from 'skitch-testing';
import { prompt } from 'inquirerer';
import { writeFileSync, readFileSync } from 'fs';

const sluggify = (text) => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}



export default async argv => {
  const sql = await resolve();
  const skitchPath = await path();
  const pkg = require(`${skitchPath}/package.json`);

  const questions = [
    {
      name: 'version',
      default: pkg.version,
      required: true,
    },
  ];
  const { version } = await prompt(questions, argv);

  const extname = sluggify(pkg.name);
  const Makefile = readFileSync(`${skitchPath}/${extname}.control`).toString();
  const control = readFileSync(`${skitchPath}/package.json`).toString();

  // control file
  writeFileSync(`${skitchPath}/${extname}.control`, control.replace(/default_version = '[0-9\.]+'/, `default_version = '${version}'`));

  // makefile
  var regex = new RegExp(name + '--[0-9\.]+.sql')
  writeFileSync(`${skitchPath}/Makefile`, Makefile.replace(regex,`${skitchPath}/${extname}--${pkg.version}.sql`));

  // sql
  writeFileSync(`${skitchPath}/${extname}--${pkg.version}.sql`, sql);
};
