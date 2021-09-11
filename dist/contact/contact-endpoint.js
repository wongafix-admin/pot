"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeContactEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _contact = _interopRequireDefault(require("./contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeContactEndpointHandler({
  contactQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postContact(httpRequest);

      case 'GET':
        return getContact(httpRequest);

      case 'DELETE':
        return deleteContact(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getContact(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};

    if (id !== undefined) {
      const result = await contactQuery.findById({
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
      const result = await contactQuery.getContact({
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

  async function postContact(httpRequest) {
    let contactInfo = httpRequest.body;

    if (!contactInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        contactInfo = JSON.parse(contactInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const contact = (0, _contact.default)(contactInfo);
      const result = await contactQuery.add(contact);
      console.log("result returned");
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

  async function deleteContact(httpRequest) {
    //const { customer_id } = httpRequest.pathParams || {}
    const {
      id
    } = httpRequest.queryParams || {};

    try {
      const result = await contactQuery.deleteById({
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
//# sourceMappingURL=contact-endpoint.js.map