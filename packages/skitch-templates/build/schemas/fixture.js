(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./schema", "./table", "skitch-utils", "skitch-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schema_1 = require("./schema");
    var table_1 = require("./table");
    var skitch_utils_1 = require("skitch-utils");
    var skitch_utils_2 = require("skitch-utils");
    exports.requires = function (res) { return [
        schema_1.change(res),
        table_1.change(res),
    ]; };
    exports.change = function (_a) {
        var schema = _a.schema, table = _a.table, name = _a.name;
        return [
            'schemas',
            schema,
            'tables',
            table,
            'fixtures',
            Date.now() + "_{fixture}",
        ];
    };
    var questions = [
        {
            type: 'autocomplete',
            name: 'schema',
            message: 'enter a schema name',
            source: skitch_utils_1.searchSchemas,
            required: true,
        },
        {
            type: 'autocomplete',
            name: 'table',
            message: 'enter a table name',
            source: skitch_utils_2.searchTables,
            required: true,
        },
    ];
    exports.default = questions;
});
//# sourceMappingURL=fixture.js.map