"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _clientQuery = _interopRequireDefault(require("./client-query"));

var _clientEndpoint = _interopRequireDefault(require("./client-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const clientQuery = (0, _clientQuery.default)({
  database
});
const clientEndpointHandler = (0, _clientEndpoint.default)({
  clientQuery
});
var _default = clientEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map