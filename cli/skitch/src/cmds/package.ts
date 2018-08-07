import * as shell from 'shelljs';
import path from 'skitch-path';
const parser = require('pgsql-parser');

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

  const pkgPath = `${skitchPath}/package.json`;
  const pkg = require(pkgPath);

  const questions = [
    {
      name: 'version',
      message: 'version',
      default: pkg.version,
      required: true,
    },
  ];

  const { version } = await prompt(questions, argv);

  const extname = sluggify(pkg.name);
  const makePath = `${skitchPath}/Makefile`;
  const controlPath = `${skitchPath}/${extname}.control`;
  const sqlFileName = `${extname}--${version}.sql`;

  const Makefile = readFileSync(makePath).toString();
  const control = readFileSync(controlPath).toString();

  // control file
  writeFileSync(controlPath, control.replace(/default_version = '[0-9\.]+'/, `default_version = '${version}'`));

  // package json
  writeFileSync(pkgPath, JSON.stringify(Object.assign({}, pkg, {version}), null, 2));

  // makefile
  var regex = new RegExp(extname + '--[0-9\.]+.sql')
  writeFileSync(makePath, Makefile.replace(regex, sqlFileName));

  // sql
  try {
   console.log(parser.parse(sql));
    const query = parser.parse(sql).query.reduce((m, stmt)=>{
      if (stmt.hasOwnProperty('TransactionStmt')) return m;
      return [...m, stmt];
    }, []);
    writeFileSync(`${skitchPath}/sql/${sqlFileName}`, parser.deparse(query));
  } catch (e) {
    console.error(e);
  }

  console.log(`${sqlFileName} written`);
};
