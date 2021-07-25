"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _adminQuery = _interopRequireDefault(require("./admin-query"));

var _adminEndpoint = _interopRequireDefault(require("./admin-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const adminQuery = (0, _adminQuery.default)({
  database
});
const adminEndpointHandler = (0, _adminEndpoint.default)({
  adminQuery
});
var _default = adminEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map