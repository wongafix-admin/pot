"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeClient;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeClient(clientInfo = (0, _requiredParam.default)('clientInfo')) {
  console.log("make client!");
  const validClient = validate(clientInfo);
  const normalClient = normalize(validClient);
  return Object.freeze(normalClient);

  function validate({
    surname = (0, _requiredParam.default)('surname'),
    othernames = (0, _requiredParam.default)('othernames'),
    office = (0, _requiredParam.default)('office'),
    guarantor_name = (0, _requiredParam.default)('guarantor_name'),
    ...otherInfo
  } = {}) {
    //validateName('surname', surname)
    //validateName('othernames', othernames)
    console.log("Validated!");
    return {
      surname,
      othernames,
      office,
      guarantor_name,
      ...otherInfo
    };
  }
  /*function validateName (label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `Activity's ${label} must be at least 2 characters long.`
      )
    }
  }*/


  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=client.js.map