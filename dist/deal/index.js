"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _dealQuery = _interopRequireDefault(require("./deal-query"));

var _dealEndpoint = _interopRequireDefault(require("./deal-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const dealQuery = (0, _dealQuery.default)({
  database
});
const dealEndpointHandler = (0, _dealEndpoint.default)({
  dealQuery
});
var _default = dealEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map