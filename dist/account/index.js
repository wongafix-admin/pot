"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _accountQuery = _interopRequireDefault(require("./account-query"));

var _accountEndpoint = _interopRequireDefault(require("./account-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const accountQuery = (0, _accountQuery.default)({
  database
});
const accountEndpointHandler = (0, _accountEndpoint.default)({
  accountQuery
});
var _default = accountEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map