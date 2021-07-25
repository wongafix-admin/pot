"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBalanceEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _balance = _interopRequireDefault(require("./balance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeBalanceEndpointHandler({
  balanceQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postBalance(httpRequest);

      case 'GET':
        return getBalance(httpRequest);

      case 'PUT':
        return updateBalance(httpRequest);

      case 'DELETE':
        return deleteBalance(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getBalance(httpRequest) {
    console.log("Balance endpoint called");
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
      const result = await balanceQuery.findByCustomerId({
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
      const result = await balanceQuery.findById({
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
      const result = await balanceQuery.getBalance({
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

  async function postBalance(httpRequest) {
    let balanceInfo = httpRequest.body;

    if (!balanceInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        balanceInfo = JSON.parse(balanceInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const balance = (0, _balance.default)(balanceInfo);
      const result = await balanceQuery.add(balance);
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

  async function updateBalance(httpRequest) {
    let balanceInfo = httpRequest.body;

    if (!balanceInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        balanceInfo = JSON.parse(balanceInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const balance = (0, _balance.default)(balanceInfo);
      const result = await balanceQuery.update(balance);
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

  async function deleteBalance(httpRequest) {
    console.log("Delete endpoint called");
    const {
      id
    } = httpRequest.pathParams || {};
    await balanceQuery.deleteById({
      id
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
//# sourceMappingURL=balance-endpoint.js.map