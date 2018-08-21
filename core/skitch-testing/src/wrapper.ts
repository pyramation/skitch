export default function PgpWrapper(db) {
  this.db = db;
  ['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(op=>{
    this.ctx[op] = this.ctx[op].bind(this);
  });
}

['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(op=>{
  PgpWrapper.prototype[op] = function(query, values) {
    return this.db[op](query, values);
  };
})

PgpWrapper.prototype.ctx = {}
['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(op=>{
  PgpWrapper.prototype.ctx[op] = function(ctx, query, values) {
    const stmts = Object.keys(ctx).reduce((m,el)=>{
      m.push(`SELECT set_config('${el}', '${ctx[el]}', true);`);
      return m;
    }, []).join('\n');
    return this.db[op](stmts + query, values);
  };
})

PgpWrapper.prototype.task = function (p1, p2) {
  p1 = p1.bind({}, this);

  if (p2) {
    p2 = p2.bind({}, this);
  }

  return this.db.task(p1, p2);
};
