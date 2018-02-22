(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./templates/schemas/column", "./templates/schemas/foreignKey", "./templates/schemas/grantExecute", "./templates/schemas/grantSchema", "./templates/schemas/grantTable", "./templates/schemas/index", "./templates/schemas/peoplestamps", "./templates/schemas/policy", "./templates/schemas/procedure", "./templates/schemas/schema", "./templates/schemas/table", "./templates/schemas/timestamps", "./templates/schemas/trigger", "./templates/schemas/type", "./templates/schemas/uniqueIndex", "./templates/schemas/utility"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var column_1 = require("./templates/schemas/column");
    var foreignKey_1 = require("./templates/schemas/foreignKey");
    var grantExecute_1 = require("./templates/schemas/grantExecute");
    var grantSchema_1 = require("./templates/schemas/grantSchema");
    var grantTable_1 = require("./templates/schemas/grantTable");
    var index_1 = require("./templates/schemas/index");
    var peoplestamps_1 = require("./templates/schemas/peoplestamps");
    var policy_1 = require("./templates/schemas/policy");
    var procedure_1 = require("./templates/schemas/procedure");
    var schema_1 = require("./templates/schemas/schema");
    var table_1 = require("./templates/schemas/table");
    var timestamps_1 = require("./templates/schemas/timestamps");
    var trigger_1 = require("./templates/schemas/trigger");
    var type_1 = require("./templates/schemas/type");
    var uniqueIndex_1 = require("./templates/schemas/uniqueIndex");
    var utility_1 = require("./templates/schemas/utility");
    var schemas = {
        column: column_1.change,
        foreignKey: foreignKey_1.change,
        grantExecute: grantExecute_1.change,
        grantSchema: grantSchema_1.change,
        grantTable: grantTable_1.change,
        index: index_1.change,
        peoplestamps: peoplestamps_1.change,
        policy: policy_1.change,
        procedure: procedure_1.change,
        schema: schema_1.change,
        table: table_1.change,
        timestamps: timestamps_1.change,
        trigger: trigger_1.change,
        type: type_1.change,
        uniqueIndex: uniqueIndex_1.change,
        utility: utility_1.change
    };
    exports.default = schemas;
});
//# sourceMappingURL=changes.js.map