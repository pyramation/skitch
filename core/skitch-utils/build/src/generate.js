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
exports.generate = function (_a) {
    var templates = _a.templates, template = _a.template, templatePath = _a.templatePath, payload = _a.payload;
    return __awaiter(_this, void 0, void 0, function () {
        var params, vars, change, reqd, reqs, cmd;
        return __generator(this, function (_b) {
            params = Object.keys(payload).reduce(function (m, v) {
                if (payload[v] instanceof Array) {
                    payload[v].forEach(function (value) {
                        m.push({
                            key: v,
                            value: value,
                        });
                    });
                }
                else {
                    if (typeof payload[v] === 'boolean' && !payload[v]) {
                        return m;
                    }
                    m.push({
                        key: v,
                        value: payload[v],
                    });
                }
                return m;
            }, []);
            vars = params.map(function (obj) { return "--set " + obj.key + "=\"" + obj.value + "\""; }).join(' ');
            change = templates[template].change(payload);
            reqd = [];
            reqs = templates[template]
                .requires(payload)
                .filter(function (req) {
                if (reqd.includes(req.join('/'))) {
                    return false;
                }
                reqd.push(req.join('/'));
                return true;
            })
                .map(function (req) {
                return "-r " + req.join('/');
            })
                .join(' ');
            change = change.join('/');
            if (!change || change === '' || change === '/') {
                throw new Error('no change found!');
            }
            cmd = [
                'sqitch',
                'add',
                change,
                '--template',
                template,
                '--template-directory',
                templatePath,
                '-n',
                "'add " + change + "'",
                vars,
                reqs,
            ].join(' ');
            return [2 /*return*/, cmd];
        });
    });
};
//# sourceMappingURL=generate.js.map