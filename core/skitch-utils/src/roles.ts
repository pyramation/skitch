var fuzzy = require('fuzzy');
import { readdir } from 'fs';
import { resolve as resolvePath, basename, dirname } from 'path';
import * as glob from 'glob';
import skitchPath from 'skitch-path';

export interface HashObject {
  schema: string;
  [key: string]: string;
}

export interface FuzzyObject {
  [key: string]: string;
}

export const searchRolesLocal = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(async (resolve, reject) => {
    const path = await skitchPath();

    var roles;

    const roleDir = resolvePath(`${path}/deploy/roles`);

    try {
      roles = glob.sync(`${roleDir}/**/role.sql`);
    } catch (e) {
      console.log(e);
      roles = [];
    }
    roles = roles.map(f => basename(dirname(f)));

    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, roles);
      resolve(
        fuzzyResult.map(function(el: FuzzyObject) {
          return el.original;
        })
      );
    }, 25);
  });
};

export const searchRoles = (answers: HashObject, input: string) => {
  input = input || '';
  return new Promise(async (resolve, reject) => {
    const path = await skitchPath();

    const roles = ['app_anonymous', 'app_authenticated', 'app_administrator'];

    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, roles);
      resolve(
        fuzzyResult.map(function(el: FuzzyObject) {
          return el.original;
        })
      );
    }, 25);
  });
};
