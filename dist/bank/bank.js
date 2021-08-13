"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBank;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeBank(bankInfo = (0, _requiredParam.default)('bankInfo')) {
  const validBank = validate(bankInfo);
  const normalBank = normalize(validBank);
  return Object.freeze(normalBank);

  function validate({ ...otherInfo
  } = {}) {
    return { ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Bank ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo //account_name: upperFirst(account_name),
      //bank: upperFirst(bank)

    };
  }
}
//# sourceMappingURL=bank.js.map