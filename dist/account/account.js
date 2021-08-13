"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAccount;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAccount(accountInfo = (0, _requiredParam.default)('accountInfo')) {
  const validAccount = validate(accountInfo);
  const normalAccount = normalize(validAccount);
  return Object.freeze(normalAccount);

  function validate({ // email = requiredParam('email'),
    // phone = requiredParam('phone'),
    // bank = requiredParam('bank'),
    // account_id = requiredParam('account_id'),
    // account_name = requiredParam('account_name'),
    // account_nuban = requiredParam('account_nuban'),
    // account_type = requiredParam('account_type'),
    // account_connected = requiredParam('account_connected'),
    ...otherInfo
  } = {}) {
    //validateName('account_name', account_name)
    //validateName('bank', bank)
    return { ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Account ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo // account_name: upperFirst(account_name),
      // bank: upperFirst(bank)

    };
  }
}
//# sourceMappingURL=account.js.map