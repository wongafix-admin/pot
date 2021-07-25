"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _bankQuery = _interopRequireDefault(require("./bank-query"));

var _bankEndpoint = _interopRequireDefault(require("./bank-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const bankQuery = (0, _bankQuery.default)({
  database
});
const bankEndpointHandler = (0, _bankEndpoint.default)({
  bankQuery
});
var _default = bankEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map