"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _transactionQuery = _interopRequireDefault(require("./transaction-query"));

var _transactionEndpoint = _interopRequireDefault(require("./transaction-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const transactionQuery = (0, _transactionQuery.default)({
  database
});
const transactionEndpointHandler = (0, _transactionEndpoint.default)({
  transactionQuery
});
var _default = transactionEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map