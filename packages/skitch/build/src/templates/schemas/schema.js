(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.change = function (_a) {
        var schema = _a.schema;
        return [
            'schemas',
            schema,
            'schema'
        ];
    };
    exports.requires = function (res) { return []; };
    var questions = [
        {
            type: 'string',
            name: 'schema',
            message: 'enter a schema name',
            required: true
        }
    ];
    exports.default = questions;
});
//# sourceMappingURL=schema.js.map