"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _uploadsQuery = _interopRequireDefault(require("./uploads-query"));

var _uploadsEndpoint = _interopRequireDefault(require("./uploads-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const uploadsQuery = (0, _uploadsQuery.default)({
  database
});
const uploadsEndpointHandler = (0, _uploadsEndpoint.default)({
  uploadsQuery
});
var _default = uploadsEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map