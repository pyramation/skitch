import * as shell from 'shelljs';
import {sqitchPath as path} from 'skitch-utils';
const parser = require('pgsql-parser');

// TODO move resolve to skitch-utils
import { resolve } from 'skitch-testing';
import { transformProps } from 'skitch-transform';
import { prompt } from 'inquirerer';
import { writeFileSync, readFileSync } from 'fs';

const sluggify = (text) => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

const noop = () => undefined;

export const cleanTree = (tree) => {
  return transformProps(tree, {
    stmt_len: noop,
    stmt_location: noop,
    location: noop
  });
};

export default async argv => {
  const sql = await resolve();
  const sqitchPath = await path();

  const pkgPath = `${sqitchPath}/package.json`;
  const pkg = require(pkgPath);

  const questions = [
    {
      name: 'version',
      message: 'version',
      default: pkg.version,
      required: true,
    },
    {
      name: 'ignore',
      message: 'ignore',
      required: true,
      filter: (value) => {
        return value.split(',')
      }
    }
  ];

  const { version, ignore } = await prompt(questions, argv);

  console.log(ignore);
  console.log(ignore);
  console.log(ignore);
  console.log(ignore);
  console.log(ignore);

  const extname = sluggify(pkg.name);
  const makePath = `${sqitchPath}/Makefile`;
  const controlPath = `${sqitchPath}/${extname}.control`;
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
    const query = parser.parse(sql).query.reduce((m, stmt)=>{
      if (stmt.RawStmt.stmt.hasOwnProperty('TransactionStmt')) return m;
      return [...m, stmt];
    }, []);

    const finalSql = parser.deparse(query);
    writeFileSync(`${sqitchPath}/${sqlFileName}`, `${finalSql}`);

    const tree1 = query;
    const tree2 = parser.parse(finalSql).query;

    const diff = (JSON.stringify(cleanTree(tree1)) !== JSON.stringify(cleanTree(tree2)));
    if (diff) {
      console.error('DIFF exists! Careful. Check current folder...');
      writeFileSync(`${sqitchPath}/${sqlFileName}.tree.orig.json`, JSON.stringify(cleanTree(tree1), null, 2));
      writeFileSync(`${sqitchPath}/${sqlFileName}.tree.parsed.json`, JSON.stringify(cleanTree(tree2), null, 2));
    }

    console.log(`${sqlFileName} written`);
  } catch (e) {
    console.error(e);
  }

};
