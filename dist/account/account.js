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

  function validate({
    email = (0, _requiredParam.default)('email'),
    phone = (0, _requiredParam.default)('phone'),
    bank = (0, _requiredParam.default)('bank'),
    account_id = (0, _requiredParam.default)('account_id'),
    account_name = (0, _requiredParam.default)('account_name'),
    account_nuban = (0, _requiredParam.default)('account_nuban'),
    account_type = (0, _requiredParam.default)('account_type'),
    account_connected = (0, _requiredParam.default)('account_connected'),
    ...otherInfo
  } = {}) {
    validateName('account_name', account_name);
    validateName('bank', bank);
    return {
      email,
      phone,
      bank,
      account_id,
      account_name,
      account_nuban,
      account_type,
      account_connected,
      ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Account ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({
    account_name,
    bank,
    ...otherInfo
  }) {
    return { ...otherInfo,
      account_name: (0, _upperFirst.default)(account_name),
      bank: (0, _upperFirst.default)(bank)
    };
  }
}
//# sourceMappingURL=account.js.map