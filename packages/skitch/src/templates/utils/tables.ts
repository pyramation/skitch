var fuzzy = require('fuzzy');
import { readdir } from 'fs';
import { resolve as resolvePath, basename, dirname } from 'path';
import glob from 'glob';

export interface HashObject {
  [key: string]: string;
}

export interface FuzzyObject {
  [key: string]: string;
}

export const searchTables = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(function(resolve) {
    let { schema } = answers;
    if (!schema) {
      schema = '**';
    }

    var tables;
    try {
      tables = glob.sync(
        resolvePath(
          `${process.cwd()}/deploy/schemas/${schema}/tables/**/table.sql`
        )
      );
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
