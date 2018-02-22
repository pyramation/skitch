(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./schema", "./table", "../utils/schemas", "../utils/tables"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schema_1 = require("./schema");
    var table_1 = require("./table");
    var schemas_1 = require("../utils/schemas");
    var tables_1 = require("../utils/tables");
    exports.requires = function (res) { return [
        schema_1.change(res),
        table_1.change(res)
    ]; };
    exports.change = function (_a) {
        var schema = _a.schema, table = _a.table, index = _a.index;
        return [
            'schemas',
            schema,
            'tables',
            table,
            'indexes',
            index
        ];
    };
    var questions = [
        {
            type: 'autocomplete',
            name: 'schema',
            message: 'enter a schema name',
            source: schemas_1.searchSchemas,
            required: true
        },
        {
            type: 'autocomplete',
            name: 'table',
            message: 'enter a table name',
            source: tables_1.searchTables,
            required: true
        },
        {
            type: 'string',
            name: 'index',
            message: 'enter an index name',
            required: true
        }
    ];
    exports.default = questions;
});
//# sourceMappingURL=index.js.map