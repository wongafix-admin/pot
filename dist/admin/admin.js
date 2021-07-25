"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAdmin;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAdmin(adminInfo = (0, _requiredParam.default)('adminInfo')) {
  const validAdmin = validate(adminInfo);
  const normalAdmin = normalize(validAdmin);
  return Object.freeze(normalAdmin);

  function validate({ ...otherInfo
  } = {}) {
    return { ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Admin's ${label} must be at least 2 characters long.`);
    }
  }

  function validateEmail(email) {
    if (!(0, _isValidEmail.default)(email)) {
      throw new _errors.InvalidPropertyError('Invalid email address.');
    }
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=admin.js.map