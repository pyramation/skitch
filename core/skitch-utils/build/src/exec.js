"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require();
shell;
from;
'shelljs';
var skitch_env_1 = require("skitch-env");
exports.execSync = function (cmd, opts) {
    module_1.exec(cmd, __assign({ env: {
            PGUSER: skitch_env_1.PGUSER,
            PGPASSWORD: skitch_env_1.PGPASSWORD,
            PGHOST: skitch_env_1.PGHOST,
            PGPORT: skitch_env_1.PGPORT,
            PATH: skitch_env_1.PATH
        } }, opts));
};
//# sourceMappingURL=exec.js.map