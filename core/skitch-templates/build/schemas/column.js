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
    var schema = _a.schema, table = _a.table, column = _a.column;
    return [
        'schemas',
        schema,
        'tables',
        table,
        'alterations',
        "alter_table_add_" + column,
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
    {
        type: 'string',
        name: 'column',
        message: 'enter a column name',
        required: true,
    },
    {
        type: 'string',
        name: 'columntype',
        message: 'enter a column type',
        required: true,
    },
    {
        type: 'list',
        name: 'columnnull',
        message: 'choose a null option',
        choices: ['NOT NULL', 'NULL', { name: '(none)', value: '' }],
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=column.js.map