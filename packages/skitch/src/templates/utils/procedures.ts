var fuzzy = require('fuzzy');
import { readdir } from 'fs';
import { resolve as resolvePath, basename, dirname } from 'path';
import { promisify } from 'util';
import glob from 'glob';

export interface HashObject {
  schema: string;
  [key: string]: string;
}

export interface FuzzyObject {
  [key: string]: string;
}

export const searchProcedures = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(function(resolve) {
    let { schema } = answers;
    if (!schema) {
      schema = '**';
    }
    var procs;

    try {
      procs = glob.sync(
        resolvePath(
          `${process.cwd()}/deploy/schemas/${schema}/procedures/**.sql`
        )
      );
    } catch (e) {
      procs = [];
    }
    procs = procs.map(f => basename(f).replace('.sql', ''));

    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, procs);
      resolve(
        fuzzyResult.map(function(el: FuzzyObject) {
          return el.original;
        })
      );
    }, 25);
  });
};
