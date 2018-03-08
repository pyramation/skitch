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
    var schema = _a.schema, table = _a.table;
    return [
        'schemas',
        schema,
        'tables',
        table,
        'triggers',
        'timestamps'
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
        type: 'confirm',
        name: 'updated_at',
        message: 'add updated_at trigger?',
        required: true
    }
];
exports.default = questions;
//# sourceMappingURL=timestamps.js.map