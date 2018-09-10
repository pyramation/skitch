"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var rowLevelSecurity_1 = require("./rowLevelSecurity");
var table_1 = require("./table");
var skitch_utils_1 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
    table_1.change(res),
    rowLevelSecurity_1.change(res),
]; };
exports.change = function (_a) {
    var schema = _a.schema, table = _a.table, action = _a.action, role = _a.role, policy = _a.policy;
    return [
        'schemas',
        schema,
        'tables',
        table,
        'policies',
        policy
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
        type: 'string',
        name: 'policy',
        message: 'choose a policy name',
        required: true,
        filter: function (val) { return val.toLowerCase(); }
    },
    {
        type: 'checkbox',
        name: 'grant',
        message: 'choose role for grant (optional)',
        choices: ['authenticated', 'anonymous', 'administrator'],
        required: false,
    }
];
exports.default = questions;
//# sourceMappingURL=fullPolicy.js.map