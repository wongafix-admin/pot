"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDeal;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeDeal(dealInfo = (0, _requiredParam.default)('dealInfo')) {
  const validDeal = validate(dealInfo);
  const normalDeal = normalize(validDeal);
  return Object.freeze(normalDeal);

  function validate({
    customer_id = (0, _requiredParam.default)('customer_id'),
    status = (0, _requiredParam.default)('status'),
    ...otherInfo
  } = {}) {
    //validateName('surname', surname)
    //validateName('othernames', othernames)
    return {
      customer_id,
      status,
      ...otherInfo
    };
  }

  function normalize({
    surname,
    othernames,
    ...otherInfo
  }) {
    return { ...otherInfo,
      surname: (0, _upperFirst.default)(surname),
      othernames: (0, _upperFirst.default)(othernames)
    };
  }
}
//# sourceMappingURL=deal.js.map