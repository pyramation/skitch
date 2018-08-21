"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PgpWrapper(db, ctx) {
    var _this = this;
    this.db = db;
    this._ctx = Object.keys(ctx).reduce(function (m, el) {
        m.push("SELECT set_config('" + el + "', '" + ctx[el] + "', true);");
        return m;
    }, []).join('\n');
    ['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(function (op) {
        _this[op] = function (ctx, query, values) {
            return db[op](this._ctx + query, values);
        };
    });
}
exports.default = PgpWrapper;
//# sourceMappingURL=wrapper.js.map