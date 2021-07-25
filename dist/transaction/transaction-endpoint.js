"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTransactionEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _transaction = _interopRequireDefault(require("./transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeTransactionEndpointHandler({
  transactionQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postTransaction(httpRequest);

      case 'GET':
        return getTransaction(httpRequest);

      case 'PUT':
        return updateTransaction(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getTransaction(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};
    const {
      customer_id
    } = httpRequest.queryParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};

    if (customer_id !== undefined) {
      const result = await transactionQuery.findByCustomerId({
        customer_id
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else if (id !== undefined) {
      const result = await transactionQuery.findById({
        id
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else {
      const result = await transactionQuery.getTransactions({
        max,
        before,
        after
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    }
  }

  async function postTransaction(httpRequest) {
    let transactionInfo = httpRequest.body;

    if (!transactionInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        transactionInfo = JSON.parse(transactionInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const transaction = (0, _transaction.default)(transactionInfo);
      const result = await transactionQuery.add(transaction);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      };
    } catch (e) {
      return (0, _httpError.default)({
        errorMessage: e.message,
        statusCode: e instanceof _errors.UniqueConstraintError ? 409 : e instanceof _errors.InvalidPropertyError || e instanceof _errors.RequiredParameterError ? 400 : 500
      });
    }
  }

  async function updateTransaction(httpRequest) {
    let transactionInfo = httpRequest.body;

    if (!transactionInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        transactionInfo = JSON.parse(transactionInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const transaction = (0, _transaction.default)(transactionInfo);
      const result = await transactionQuery.update(transaction);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      };
    } catch (e) {
      return (0, _httpError.default)({
        errorMessage: e.message,
        statusCode: e instanceof _errors.UniqueConstraintError ? 409 : e instanceof _errors.InvalidPropertyError || e instanceof _errors.RequiredParameterError ? 400 : 500
      });
    }
  }
}
//# sourceMappingURL=transaction-endpoint.js.map