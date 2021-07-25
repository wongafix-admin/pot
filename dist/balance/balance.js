"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBalance;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeBalance(balanceInfo = (0, _requiredParam.default)('balanceInfo')) {
  console.log("Make Balance called");
  const validBalance = validate(balanceInfo);
  const normalBalance = normalize(validBalance);
  return Object.freeze(normalBalance);

  function validate({ ...otherInfo
  } = {}) {
    //validateName('account_name', account_name)
    //validateName('bank', bank)
    console.log("Validate balance called");
    return { ...otherInfo
    };
  }

  function normalize({ ...otherInfo
  }) {
    console.log("Normalize balance called");
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=balance.js.map