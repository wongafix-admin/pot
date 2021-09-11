"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSettingss;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSettingss(settingsInfo = (0, _requiredParam.default)('settingsInfo')) {
  const validSettings = validate(settingsInfo);
  const normalSettings = normalize(validSettings);
  return Object.freeze(normalSettings);

  function validate({
    category = (0, _requiredParam.default)('category'),
    ...otherInfo
  } = {}) {
    validateName('category', category);
    return {
      category,
      ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Settings info ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo // account_name: upperFirst(account_name),
      // bank: upperFirst(bank)

    };
  }
}
//# sourceMappingURL=settings.js.map