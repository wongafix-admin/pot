"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredParam;

var _errors = require("./errors");

function requiredParam(param) {
  throw new _errors.RequiredParameterError(param);
}
//# sourceMappingURL=required-param.js.map