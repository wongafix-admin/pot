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
  console.log("makedeal called");
  const validDeal = validate(dealInfo);
  const normalDeal = normalize(validDeal);
  return Object.freeze(normalDeal);

  function validate({ // customer_id = requiredParam('customer_id'),
    // status = requiredParam('status'),
    ...otherInfo
  } = {}) {
    //validateName('surname', surname)
    //validateName('othernames', othernames)
    console.log("validate deal called");
    return { ...otherInfo
    };
  }

  function normalize({ ...otherInfo
  }) {
    console.log("deal normalize");
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=deal.js.map