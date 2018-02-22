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
        column: column_1.default,
        foreignKey: foreignKey_1.default,
        grantExecute: grantExecute_1.default,
        grantSchema: grantSchema_1.default,
        grantTable: grantTable_1.default,
        index: index_1.default,
        peoplestamps: peoplestamps_1.default,
        policy: policy_1.default,
        procedure: procedure_1.default,
        schema: schema_1.default,
        table: table_1.default,
        timestamps: timestamps_1.default,
        trigger: trigger_1.default,
        type: type_1.default,
        uniqueIndex: uniqueIndex_1.default,
        utility: utility_1.default
    };
    exports.default = schemas;
});
//# sourceMappingURL=schemas.js.map