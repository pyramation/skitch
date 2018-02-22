(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./schema", "skitch-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schema_1 = require("./schema");
    var skitch_utils_1 = require("skitch-utils");
    exports.requires = function (res) { return [
        schema_1.change(res)
    ]; };
    exports.change = function (_a) {
        var schema = _a.schema, procedure = _a.procedure;
        return [
            'schemas',
            schema,
            'procedures',
            procedure
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
            type: 'string',
            name: 'procedure',
            message: 'enter a procedure name',
            required: true
        },
        {
            type: 'list',
            name: 'stability',
            message: 'choose the stability',
            choices: ['STABLE', 'VOLATILE', 'IMMUTABLE', 'IMMUTABLE STRICT'],
            required: true
        },
        {
            type: 'list',
            name: 'lang',
            message: 'choose the language',
            choices: ['sql', 'plpgsql', 'plv8'],
            required: true
        }
    ];
    exports.default = questions;
});
//# sourceMappingURL=procedure.js.map