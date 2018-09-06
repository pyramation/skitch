"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var utils_1 = require("./utils");
var parser = require('pgsql-parser');
describe('transforms', function () {
    it('function', function () {
        var input = "SELECT * FROM original.table";
        var expectResult = "SELECT * FROM amazing.\"table\";";
        var result = index_1.transform(input, {
            schemaname: function (value) {
                if (value === 'original') {
                    return 'amazing';
                }
                return value;
            },
        });
        expect(utils_1.cleanTree(parser.parse(result))).toEqual(utils_1.cleanTree(parser.parse(expectResult)));
    });
    it('object', function () {
        var input = "SELECT * FROM original.table";
        var expectResult = "SELECT * FROM amazing.\"table\";";
        var result = index_1.transform(input, {
            schemaname: {
                original: 'amazing',
            },
        });
        expect(utils_1.cleanTree(parser.parse(result))).toEqual(utils_1.cleanTree(parser.parse(expectResult)));
    });
    it('integration', function () {
        var input = "CREATE TABLE users_private.user_account (\n        user_id uuid PRIMARY KEY REFERENCES users.user (id) ON DELETE CASCADE,\n        email text NOT NULL UNIQUE CHECK (email ~* '^.+@.+..+$'),\n        password_hash text NOT NULL\n    );";
        var expectResult = "CREATE TABLE customers.profile (\n     \tuser_id uuid PRIMARY KEY REFERENCES users.\"user\" ( id ) ON DELETE CASCADE,\n    \temail text NOT NULL UNIQUE CHECK ( ((email) ~* ('^.+@.+..+$')) ),\n    \tpassword_hash text NOT NULL\n    );";
        var result = index_1.transform(input, {
            schemaname: {
                users_private: 'customers',
            },
            relname: {
                user_account: 'profile',
            },
        });
        expect(utils_1.cleanTree(parser.parse(result))).toEqual(utils_1.cleanTree(parser.parse(expectResult)));
    });
});
//# sourceMappingURL=parse.test.js.map