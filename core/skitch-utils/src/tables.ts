var fuzzy = require('fuzzy');
import { readdir } from 'fs';
import { resolve as resolvePath, basename, dirname } from 'path';
import * as glob from 'glob';
import skitchPath from 'skitch-path';

export interface HashObject {
  [key: string]: string;
}

export interface FuzzyObject {
  [key: string]: string;
}

export const searchTables = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(async resolve => {
    const path = await skitchPath();

    let { schema } = answers;
    if (!schema) {
      schema = '**';
    }

    const tablesDir = resolvePath(`${path}/deploy/schemas`);

    var tables;
    try {
      tables = glob.sync(`${tablesDir}/${schema}/tables/**/table.sql`);
    } catch (e) {
      tables = [];
    }

    tables = tables.map(f => basename(dirname(f)));

    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, tables);
      resolve(
        fuzzyResult.map(function(el: FuzzyObject) {
          return el.original;
        })
      );
    }, 25);
  });
};