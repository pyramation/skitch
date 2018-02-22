var fuzzy = require('fuzzy');
import { readdir } from 'fs';
import { resolve as resolvePath } from 'path';
import { promisify } from 'util';

export interface HashObject {
  [key: string]: string;
}

export interface FuzzyObject {
  [key: string]: string;
}

export const searchSchemas = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(async function(resolve) {
    var dirs;
    try {
      dirs = await promisify(readdir)(
        resolvePath(process.cwd() + '/deploy/schemas')
      );
    } catch (e) {
      dirs = [];
    }

    dirs = dirs.filter(f => f !== '.DS_Store');

    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, dirs);
      resolve(
        fuzzyResult.map(function(el: FuzzyObject) {
          return el.original;
        })
      );
    }, 25);
  });
};
