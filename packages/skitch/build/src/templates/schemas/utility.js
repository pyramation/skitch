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
    exports.requires = function (res) { return []; };
    exports.change = function (_a) {
        var procedure = _a.procedure;
        return [
            'procedures',
            procedure
        ];
    };
    var questions = [
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
//# sourceMappingURL=utility.js.map