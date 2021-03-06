"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var inquirerer_1 = require("inquirerer");
var pgPromise = require('pg-promise');
var skitch_env_1 = require("skitch-env");
var policies = "SELECT\n  CONCAT(n.nspname, '.', c.relname) AS tablename,\n  pol.polname AS policyname\n  FROM pg_policy pol\n  JOIN pg_class c ON c.oid = pol.polrelid\n  LEFT JOIN pg_namespace n ON n.oid = c.relnamespace\n";
var grants = "SELECT\n  grantee, privilege_type, table_schema, table_name\n  FROM information_schema.role_table_grants\n  WHERE grantee != 'postgres'\n  AND grantee != 'PUBLIC'\n  ORDER BY table_schema, table_name\n";
var anonymous = "SELECT\n  grantee, privilege_type, table_schema, table_name\n  FROM information_schema.role_table_grants\n  WHERE grantee = 'anonymous'\n  ORDER BY table_schema, table_name\n";
var anonymousFunctions = "SELECT\n  CONCAT(routine_schema, '.', routine_name) AS anonFunction\n  FROM information_schema.role_routine_grants\n  WHERE grantee = 'anonymous'\n";
var authenticated = "SELECT\n  grantee, privilege_type, table_schema, table_name\n  FROM information_schema.role_table_grants\n  WHERE grantee = 'authenticated'\n  ORDER BY table_schema, table_name\n";
var authenticatedFunctions = "SELECT\n  CONCAT(routine_schema, '.', routine_name) as authenticatedFunction\n  FROM information_schema.role_routine_grants\n  WHERE grantee = 'authenticated'\n";
var tables = "SELECT\n  CONCAT(table_schema, '.', table_name) AS tbl\n  FROM information_schema.tables\n  WHERE table_schema != 'pg_catalog'\n  AND table_schema != 'sqitch'\n  AND table_schema != 'information_schema'\n  ORDER BY table_schema, table_name\n";
var security = "SELECT\n  CONCAT(relname, '.', n.nspname), 'enabled'::TEXT AS tablename\n\tFROM pg_class p\n\tJOIN pg_catalog.pg_namespace n ON n.oid = p.relnamespace\n\tWHERE relrowsecurity = 'true'\n";
var QUERIES = {
    policies: policies,
    roles: "SELECT rolname FROM pg_roles",
    schemas: "SELECT * FROM pg_catalog.pg_namespace",
    grants: grants,
    tables: tables,
    security: security,
    anonymous: anonymous,
    anonymousFunctions: anonymousFunctions,
    authenticated: authenticated,
    authenticatedFunctions: authenticatedFunctions,
};
var questions = [
    {
        _: true,
        name: 'db',
        message: 'database',
        required: true,
    },
    {
        _: true,
        type: 'list',
        name: 'query',
        message: 'choose a query',
        choices: Object.keys(QUERIES),
        required: true,
    },
];
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var _a, db, query, initOptions, pgp, cn, d, result, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 1:
                _a = _b.sent(), db = _a.db, query = _a.query;
                initOptions = {};
                pgp = pgPromise(initOptions);
                cn = {
                    host: skitch_env_1.PGHOST,
                    port: skitch_env_1.PGPORT,
                    database: db,
                    user: skitch_env_1.PGUSER,
                    password: skitch_env_1.PGPASSWORD,
                };
                d = pgp(cn);
                console.log(query);
                return [4 /*yield*/, d.any(QUERIES[query])];
            case 2:
                result = _b.sent();
                console.log(JSON.stringify(result, null, 2));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.error(e_1);
                return [3 /*break*/, 4];
            case 4:
                pgp.end();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=info.js.map