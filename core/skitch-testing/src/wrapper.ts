export default function PgpWrapper(db, ctx) {
  this.db = db;

  this._ctxStmts = function(ctx) {
    return Object.keys(ctx).reduce((m,el)=>{
      m.push(`SELECT set_config('${el}', '${ctx[el]}', true);`);
      return m;
    }, []).join('\n');
  };
}

['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(op=>{
  PgpWrapper.prototype[op] = function(query, values) {
    return this.db[op](this._ctxStmts + query, values);
  };
});
