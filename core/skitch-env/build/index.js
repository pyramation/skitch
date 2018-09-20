"use strict";
var envalid = require('envalid');
var port = envalid.port, str = envalid.str;
module.exports = envalid.cleanEnv(process.env, {
    PGPORT: port({ default: 5432 }),
    PGHOST: str({ default: 'localhost' }),
    PGUSER: str({ default: 'postgres' }),
    PGPASSWORD: str({ default: 'password' })
}, { dotEnvPath: null });
//# sourceMappingURL=index.js.map