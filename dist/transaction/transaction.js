"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTransaction;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeTransaction(transactionInfo = (0, _requiredParam.default)('transactionInfo')) {
  const validTransaction = validate(transactionInfo);
  const normalTransaction = normalize(validTransaction);
  return Object.freeze(normalTransaction);

  function validate({
    /*customer_id = requiredParam('customer_id'),
    payment_id = requiredParam('payment_id'),
    amount = requiredParam('amount'),
    paid_month = requiredParam('paid_month'),
    paid_year = requiredParam('paid_year'),
    bank = requiredParam('bank'),
    account_id = requiredParam('account_id'),
    account_name = requiredParam('account_name'),
    account_type = requiredParam('account_type'),
    status = requiredParam('status'),*/
    ...otherInfo
  } = {}) {
    return { ...otherInfo
    };
  }
  /*function validateName (label, name) {
      if (name.length < 2) {
          throw new InvalidPropertyError(
          `Property's ${label} must be at least 2 characters long.`
          )
      }
  }*/


  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo
    };
  }
  /*function formatPrice(price){
      var formatter = new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
      });
       return formatter.price;
  }*/

}
//# sourceMappingURL=transaction.js.map