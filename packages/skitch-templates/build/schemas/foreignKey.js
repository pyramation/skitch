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
    exports.requires = function (res) {
        var refschema = res.refschema, reftable = res.reftable;
        return [
            schema_1.change(res),
            schema_1.change({
                schema: refschema,
            }),
            table_1.change(res),
            table_1.change({
                schema: refschema,
                table: reftable,
            }),
        ];
    };
    exports.change = function (_a) {
        var schema = _a.schema, table = _a.table, column = _a.column;
        return [
            'schemas',
            schema,
            'tables',
            table,
            'alterations',
            "add_foreign_key_" + column,
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
            type: 'autocomplete',
            name: 'refschema',
            message: 'enter a refschema name',
            source: skitch_utils_1.searchSchemas,
            required: true,
        },
        {
            type: 'autocomplete',
            name: 'reftable',
            message: 'enter a reftable name',
            source: function (answers, input) {
                var refschema = answers.refschema;
                return skitch_utils_2.searchTables({ schema: refschema }, input);
            },
            required: true,
        },
        {
            type: 'string',
            name: 'refcolumn',
            message: 'enter a refcolumn name',
            required: true,
        },
        {
            type: 'string',
            name: 'shardcolumn',
            message: 'enter a shard column (if exists)',
            required: false,
        },
        {
            type: 'list',
            name: 'cascade',
            message: 'choose a delete option',
            choices: [
                'ON DELETE CASCADE',
                'ON DELETE RESTRICT',
                { name: '(none)', value: '' },
            ],
            required: true,
        },
    ];
    exports.default = questions;
});
//# sourceMappingURL=foreignKey.js.map