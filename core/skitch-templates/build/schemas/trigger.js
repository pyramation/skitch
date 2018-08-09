"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var table_1 = require("./table");
var skitch_utils_1 = require("skitch-utils");
var skitch_utils_2 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
    table_1.change(res)
]; };
exports.change = function (_a) {
    var schema = _a.schema, triggername = _a.triggername;
    return [
        'schemas',
        schema,
        'tables',
        table_1.change,
        'triggers',
        triggername
    ];
};
var questions = [
    {
        type: 'autocomplete',
        name: 'schema',
        message: 'enter a schema name',
        source: skitch_utils_1.searchSchemas,
        required: true
    },
    {
        type: 'autocomplete',
        name: 'table',
        message: 'enter a table name',
        source: skitch_utils_2.searchTables,
        required: true
    },
    {
        type: 'string',
        name: 'triggername',
        message: 'enter a trigger name',
        required: true
    },
    {
        type: 'list',
        name: 'when',
        message: 'choose when',
        choices: ['BEFORE', 'AFTER'],
        required: true
    },
    {
        type: 'list',
        name: 'op',
        message: 'choose ops',
        choices: ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'],
        required: true
    }
];
exports.default = questions;
//# sourceMappingURL=trigger.js.map