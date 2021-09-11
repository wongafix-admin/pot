"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeASettingsEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _settings = _interopRequireDefault(require("./settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeASettingsEndpointHandler({
  settingsQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postSettings(httpRequest);

      case 'GET':
        return getSettings(httpRequest);

      case 'PUT':
        return updateSettings(httpRequest);

      case 'DELETE':
        return deleteSettings(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getSettings(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};

    if (id !== undefined) {
      const result = await settingsQuery.findById({
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
      const result = await settingsQuery.getSettings({
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

  async function postSettings(httpRequest) {
    let settingsInfo = httpRequest.body;

    if (!settingsInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        settingsInfo = JSON.parse(settingsInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const settings = (0, _settings.default)(settingsInfo);
      const result = await settingsQuery.add(settings);
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

  async function updateSettings(httpRequest) {
    let settingsInfo = httpRequest.body;

    if (!settingsInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        settingsInfo = JSON.parse(settingsInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const settings = (0, _settings.default)(settingsInfo);
      const result = await settingsQuery.update(settings);
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

  async function deleteSettings(httpRequest) {
    //const { customer_id } = httpRequest.pathParams || {}
    const {
      id
    } = httpRequest.queryParams || {};

    try {
      const result = await settingsQuery.deleteById({
        _id,
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
//# sourceMappingURL=settings-endpoint.js.map