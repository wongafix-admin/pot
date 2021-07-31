"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _query = _interopRequireDefault(require("./query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const queryHandler = (0, _query.default)();
var _default = queryHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map