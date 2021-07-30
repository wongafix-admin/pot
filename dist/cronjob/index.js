"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _dbQuery = _interopRequireDefault(require("./db-query"));

var _okraQuery = _interopRequireDefault(require("./okra-query"));

var _cronEndpoint = _interopRequireDefault(require("./cron-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const dbQuery = (0, _dbQuery.default)({
  database
});
const okraQuery = (0, _okraQuery.default)();
const cronEndpointHandler = (0, _cronEndpoint.default)({
  dbQuery,
  okraQuery
});
var _default = cronEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map