import { sqitchPath as path } from './paths';
const parser = require('pgsql-parser');
import { resolve } from './resolve';
import { transformProps } from 'skitch-transform';

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

export const packageModule = async () => {
  const sqitchPath = await path();
  const sql = await resolve(sqitchPath);
  const pkgPath = `${sqitchPath}/package.json`;
  const pkg = require(pkgPath);
  const extname = sluggify(pkg.name);

  // sql
  try {
    const query = parser.parse(sql).query.reduce((m, stmt)=>{
      if (stmt.RawStmt.stmt.hasOwnProperty('TransactionStmt')) return m;
      if (stmt.RawStmt.stmt.hasOwnProperty('CreateExtensionStmt')) return m;
      return [...m, stmt];
    }, []);
    const topLine = `\\echo Use "CREATE EXTENSION ${extname}" to load this file. \\quit\n`;
    const finalSql = parser.deparse(query);
    const tree1 = query;
    const tree2 = parser.parse(finalSql).query;
    const results = {
      sql: `${topLine}${finalSql}`
    };
    const diff = (JSON.stringify(cleanTree(tree1)) !== JSON.stringify(cleanTree(tree2)));
    if (diff) {
      results.diff = true;
      results.tree1 = JSON.stringify(cleanTree(tree1), null, 2);
      results.tree2 = JSON.stringify(cleanTree(tree2), null, 2);
    }

    return results;
  } catch (e) {
    console.error(e);
  }

};
