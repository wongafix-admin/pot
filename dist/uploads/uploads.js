"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUploads;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeUploads(uploadInfo = (0, _requiredParam.default)('uploadInfo')) {
  const validUpload = validate(uploadInfo);
  const normalUpload = normalize(validUpload);
  return Object.freeze(normalUpload);

  function validate({
    subscriber_id = (0, _requiredParam.default)('subscriber_id'),
    name = (0, _requiredParam.default)('name'),
    ...otherInfo
  } = {}) {
    validateName('subscriber_id', subscriber_id);
    validateName('name', name);
    return {
      subscriber_id,
      name,
      ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Upload ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({
    name,
    ...otherInfo
  }) {
    return { ...otherInfo,
      name: (0, _upperFirst.default)(name)
    };
  }
}
//# sourceMappingURL=uploads.js.map