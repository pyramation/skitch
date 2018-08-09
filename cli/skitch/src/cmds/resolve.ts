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

  // sql
  try {
    const {query} = parser.parse(sql);
    var finalSql = parser.deparse(query);
  } catch (e) {
    console.error(e);
  }

  console.log(finalSql);
};
