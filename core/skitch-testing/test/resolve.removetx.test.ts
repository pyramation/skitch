import { resolve } from '../src/resolve';
const parser = require('pgsql-parser');

const expectResult = `CREATE SCHEMA myschema;

CREATE TABLE "myschema" . "sometable" ( "id" serial, "name" text ) ;`;

describe('resolve', () => {
  it('resolves sql in proper order', async () => {
    let sql = await resolve(__dirname + '/fixtures/basic', 'deploy', true);
    expect(sql).toBeTruthy();

    // sql
    const query = parser.parse(sql).query.reduce((m, stmt)=>{
      if (stmt.hasOwnProperty('TransactionStmt')) return m;
      m.push(stmt);
      return m;
    }, []);


    expect(parser.deparse(query)).toEqual(expectResult)

  });
});
