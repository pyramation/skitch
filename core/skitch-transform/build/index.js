"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_query_parser_1 = require("pg-query-parser");
var transformProps = function (obj, props) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj)
        return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = transformProps(obj[i], props);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (props.hasOwnProperty(attr)) {
                    if (typeof props[attr] === 'function') {
                        copy[attr] = props[attr](obj[attr]);
                    }
                    else {
                        if (props[attr].hasOwnProperty(obj[attr])) {
                            copy[attr] = props[attr][obj[attr]];
                        }
                        else {
                            copy[attr] = transformProps(obj[attr], props);
                        }
                    }
                }
                else {
                    copy[attr] = transformProps(obj[attr], props);
                }
            }
            else {
                copy[attr] = transformProps(obj[attr], props);
            }
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};
exports.transform = function (statement, props) {
    var query = pg_query_parser_1.parse(statement).query;
    query = transformProps(query, props);
    return pg_query_parser_1.deparse(query);
};
//# sourceMappingURL=index.js.map