"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PgpWrapper(db, ctx) {
    this.db = db;
    this._ctxStmts = function (ctx) {
        return Object.keys(ctx).reduce(function (m, el) {
            m.push("SELECT set_config('" + el + "', '" + ctx[el] + "', true);");
            return m;
        }, []).join('\n');
    };
}
exports.default = PgpWrapper;
['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(function (op) {
    PgpWrapper.prototype[op] = function (query, values) {
        return this.db[op](this._ctxStmts + query, values);
    };
});
//# sourceMappingURL=wrapper.js.map