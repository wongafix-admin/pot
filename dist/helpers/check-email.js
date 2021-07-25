"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkEmail;

function checkEmail(email) {
  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  return valid.test(email);
}
//# sourceMappingURL=check-email.js.map