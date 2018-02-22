(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./schemas/column", "./schemas/foreignKey", "./schemas/grantExecute", "./schemas/grantSchema", "./schemas/grantTable", "./schemas/index", "./schemas/peoplestamps", "./schemas/policy", "./schemas/procedure", "./schemas/schema", "./schemas/table", "./schemas/timestamps", "./schemas/trigger", "./schemas/type", "./schemas/uniqueIndex", "./schemas/utility"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var column = require("./schemas/column");
    var foreignKey = require("./schemas/foreignKey");
    var grantExecute = require("./schemas/grantExecute");
    var grantSchema = require("./schemas/grantSchema");
    var grantTable = require("./schemas/grantTable");
    var index = require("./schemas/index");
    var peoplestamps = require("./schemas/peoplestamps");
    var policy = require("./schemas/policy");
    var procedure = require("./schemas/procedure");
    var schema = require("./schemas/schema");
    var table = require("./schemas/table");
    var timestamps = require("./schemas/timestamps");
    var trigger = require("./schemas/trigger");
    var type = require("./schemas/type");
    var uniqueIndex = require("./schemas/uniqueIndex");
    var utility = require("./schemas/utility");
    exports.default = {
        column: column,
        foreignKey: foreignKey,
        grantExecute: grantExecute,
        grantSchema: grantSchema,
        grantTable: grantTable,
        index: index,
        peoplestamps: peoplestamps,
        policy: policy,
        procedure: procedure,
        schema: schema,
        table: table,
        timestamps: timestamps,
        trigger: trigger,
        type: type,
        uniqueIndex: uniqueIndex,
        utility: utility,
    };
});
//# sourceMappingURL=index.js.map