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
        var schema = _a.schema, table = _a.table, actions = _a.actions, role = _a.role;
        return [
            'schemas',
            schema,
            'grants',
            'tables',
            table,
            ("grant_" + actions.join('_') + "_to_" + role).toLowerCase()
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
            type: 'checkbox',
            name: 'actions',
            message: 'choose the actions',
            choices: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
            required: true
        },
        {
            type: 'list',
            name: 'role',
            message: 'choose the role',
            choices: ['anonymous_user', 'known_user'],
            required: true
        }
    ];
    exports.default = questions;
});
//# sourceMappingURL=grantTable.js.map