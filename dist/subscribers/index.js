"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _subscriberQuery = _interopRequireDefault(require("./subscriber-query"));

var _subscriberEndpoint = _interopRequireDefault(require("./subscriber-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const subscribersQuery = (0, _subscriberQuery.default)({
  database
});
const subscribersEndpointHandler = (0, _subscriberEndpoint.default)({
  subscribersQuery
});
var _default = subscribersEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map