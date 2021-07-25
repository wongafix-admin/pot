"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHttpError = makeHttpError;

function makeHttpError({
  statusCode,
  errorMessage
}) {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode,
    data: JSON.stringify({
      success: false,
      error: errorMessage
    })
  };
}
//# sourceMappingURL=http-error.js.map