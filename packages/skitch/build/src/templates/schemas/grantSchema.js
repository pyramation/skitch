(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./schema", "../utils/schemas"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schema_1 = require("./schema");
    var schemas_1 = require("../utils/schemas");
    exports.requires = function (res) { return [
        schema_1.change(res)
    ]; };
    exports.change = function (_a) {
        var schema = _a.schema, table = _a.table, role = _a.role;
        return [
            'schemas',
            schema,
            'grants',
            "grant_schema_to_" + role
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
            type: 'list',
            name: 'role',
            message: 'choose the role',
            choices: ['anonymous_user', 'known_user'],
            required: true
        }
    ];
    exports.default = questions;
});
//# sourceMappingURL=grantSchema.js.map