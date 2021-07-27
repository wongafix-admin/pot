"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDealEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _deal = _interopRequireDefault(require("./deal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeDealEndpointHandler({
  dealQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postDeal(httpRequest);

      case 'GET':
        return getDeal(httpRequest);

      case 'PUT':
        return updateDeal(httpRequest);

      case 'DELETE':
        return deleteDeal(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getDeal(httpRequest) {
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
      const result = await dealQuery.findByCustomerId({
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
      const result = await dealQuery.findById({
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
      const result = await dealQuery.getDeals({
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

  async function postDeal(httpRequest) {
    let dealInfo = httpRequest.body;

    if (!dealInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        dealInfo = JSON.parse(dealInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const deal = (0, _deal.default)(dealInfo);
      const result = await dealQuery.add(deal);
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

  async function updateDeal(httpRequest) {
    let dealsInfo = httpRequest.body;

    if (!dealsInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        dealsInfo = JSON.parse(dealsInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const deals = makeDeals(dealsInfo);
      const result = await dealQuery.update(deals);
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

  async function deleteDeal(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};
    const {
      customer_id
    } = httpRequest.queryParams || {}; // const { customer_id } = httpRequest.pathParams || {}

    if (customer_id !== undefined) {
      try {
        const result = await dealQuery.deleteByCustomerId({
          customer_id
        });
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        };
      } catch (e) {
        return (0, _httpError.default)({
          errorMessage: e.message,
          statusCode: e instanceof _errors.UniqueConstraintError ? 409 : e instanceof _errors.InvalidPropertyError || e instanceof _errors.RequiredParameterError ? 400 : 500
        });
      }
    } else {
      try {
        const result = await dealQuery.deleteById({
          id
        });
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
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
}
//# sourceMappingURL=deal-endpoint.js.map