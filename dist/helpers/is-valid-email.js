"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidEmail;

function isValidEmail(email) {
  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  return valid.test(email);
}
//# sourceMappingURL=is-valid-email.js.map