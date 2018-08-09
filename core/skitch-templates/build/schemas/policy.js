"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var table_1 = require("./table");
var skitch_utils_1 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
    table_1.change(res),
]; };
exports.change = function (_a) {
    var schema = _a.schema, table = _a.table, action = _a.action, role = _a.role;
    return [
        'schemas',
        schema,
        'tables',
        table,
        'policies',
        ("" + action).toLowerCase(),
        ("" + role).toLowerCase(),
        'policy',
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
        source: skitch_utils_1.searchTables,
        required: true,
    },
    {
        type: 'list',
        name: 'action',
        message: 'which action?',
        choices: ['ALL', 'SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    },
    {
        type: 'autocomplete',
        name: 'role',
        message: 'choose a role',
        source: skitch_utils_1.searchRoles,
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=policy.js.map