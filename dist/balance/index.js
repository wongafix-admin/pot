"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _balanceQuery = _interopRequireDefault(require("./balance-query"));

var _balanceEndpoint = _interopRequireDefault(require("./balance-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const balanceQuery = (0, _balanceQuery.default)({
  database
});
const balanceEndpointHandler = (0, _balanceEndpoint.default)({
  balanceQuery
});
var _default = balanceEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map