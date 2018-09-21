import * as shell from 'shelljs';
import { sqitchPath as path } from './paths';
const parser = require('pgsql-parser');
import { resolve } from './resolve';
import { transformProps } from 'skitch-transform';
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

export const packageModule = async (version) => {
  const sql = await resolve();
  const sqitchPath = await path();
  return {
    sql, sqitchPath
  }
};
