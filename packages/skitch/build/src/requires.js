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
        column: column_1.requires,
        foreignKey: foreignKey_1.requires,
        grantExecute: grantExecute_1.requires,
        grantSchema: grantSchema_1.requires,
        grantTable: grantTable_1.requires,
        index: index_1.requires,
        peoplestamps: peoplestamps_1.requires,
        policy: policy_1.requires,
        procedure: procedure_1.requires,
        schema: schema_1.requires,
        table: table_1.requires,
        timestamps: timestamps_1.requires,
        trigger: trigger_1.requires,
        type: type_1.requires,
        uniqueIndex: uniqueIndex_1.requires,
        utility: utility_1.requires
    };
    exports.default = schemas;
});
//# sourceMappingURL=requires.js.map