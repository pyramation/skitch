var fuzzy = require('fuzzy');
import { readdir } from 'fs';
import { resolve as resolvePath, basename, dirname } from 'path';
import glob from 'glob';
import skitchPath from 'skitch-path';

export interface HashObject {
  schema: string;
  [key: string]: string;
}

export interface FuzzyObject {
  [key: string]: string;
}

export const searchProcedures = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(async (resolve, reject) => {
    let { schema } = answers;
    if (!schema) {
      schema = '**';
    }
    var procs;

    const path = await skitchPath();

    try {
      procs = glob.sync(`${path}/deploy/schemas/${schema}/procedures/**.sql`);
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
