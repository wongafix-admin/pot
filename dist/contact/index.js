"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _contactQuery = _interopRequireDefault(require("./contact-query"));

var _contactEndpoint = _interopRequireDefault(require("./contact-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const contactQuery = (0, _contactQuery.default)({
  database
});
const contactEndpointHandler = (0, _contactEndpoint.default)({
  contactQuery
});
var _default = contactEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map