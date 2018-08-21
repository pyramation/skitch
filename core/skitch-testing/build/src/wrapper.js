"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PgpWrapper(db) {
    var _this = this;
    this.db = db;
    this.ctx = {}['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(function (op) {
        _this.ctx[op] = function (ctx, query, values) {
            var stmts = Object.keys(ctx).reduce(function (m, el) {
                m.push("SELECT set_config('" + el + "', '" + ctx[el] + "', true);");
                return m;
            }, []).join('\n');
            return this.db[op](stmts + query, values);
        };
    });
    ['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(function (op) {
        _this.ctx[op] = _this.ctx[op].bind(_this);
    });
}
exports.default = PgpWrapper;
['none', 'one', 'many', 'oneOrNone', 'manyOrNone', 'any', 'result'].forEach(function (op) {
    PgpWrapper.prototype[op] = function (query, values) {
        return this.db[op](query, values);
    };
});
PgpWrapper.prototype.task = function (p1, p2) {
    p1 = p1.bind({}, this);
    if (p2) {
        p2 = p2.bind({}, this);
    }
    return this.db.task(p1, p2);
};
//# sourceMappingURL=wrapper.js.map