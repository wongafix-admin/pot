"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _settingsQuery = _interopRequireDefault(require("./settings-query"));

var _settingsEndpoint = _interopRequireDefault(require("./settings-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const settingsQuery = (0, _settingsQuery.default)({
  database
});
const settingsEndpointHandler = (0, _settingsEndpoint.default)({
  settingsQuery
});
var _default = settingsEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map