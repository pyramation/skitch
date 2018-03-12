"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var table_1 = require("./table");
var skitch_utils_1 = require("skitch-utils");
var skitch_utils_2 = require("skitch-utils");
var skitch_utils_3 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
    table_1.change(res),
]; };
exports.change = function (_a) {
    var schema = _a.schema, table = _a.table, actions = _a.actions, role = _a.role;
    return [
        'schemas',
        schema,
        'grants',
        'tables',
        table,
        ("grant_" + actions.join('_') + "_to_" + role).toLowerCase(),
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
        source: skitch_utils_3.searchTables,
        required: true,
    },
    {
        type: 'checkbox',
        name: 'actions',
        message: 'choose the actions',
        choices: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        required: true,
    },
    {
        type: 'autocomplete',
        name: 'role',
        message: 'choose the role',
        source: skitch_utils_2.searchRoles,
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=grantTable.js.map