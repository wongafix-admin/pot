"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _deal = _interopRequireDefault(require("./deal"));

var _client = _interopRequireDefault(require("./client"));

var _admin = _interopRequireDefault(require("./admin"));

var _transaction = _interopRequireDefault(require("./transaction"));

var _account = _interopRequireDefault(require("./account"));

var _balance = _interopRequireDefault(require("./balance"));

var _subscribers = _interopRequireDefault(require("./subscribers"));

var _bank = _interopRequireDefault(require("./bank"));

var _mailer = _interopRequireDefault(require("./mailer"));

var _cronjob = _interopRequireDefault(require("./cronjob"));

var _adaptRequest = _interopRequireDefault(require("./helpers/adapt-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cors = require('cors');

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
const port = 9090; //Middleware

app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(cors());
app.post('/sendmail', sendmailController);

function sendmailController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _mailer.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.get('/cronjob/:id', cronjobController);
app.get('/cronjob/find/?start=:now', cronjobController);
app.get('/cronjob/find/?end=:now', cronjobController);

function cronjobController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _cronjob.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/admin', adminController);
app.post('/admin/add', adminController);
app.post('/admin/auth', adminController);
app.post('/admin/reset', adminController);
app.get('/admin/:id', adminController);
app.get('/admin/find/?email=:email', adminController);

function adminController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _admin.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/subscriber', subscribersController);
app.post('/subscriber/add', subscribersController);
app.post('/subscriber/verify', subscribersController);
app.get('/subscriber/:id', subscribersController);
app.get('/subscriber/find/?id=:id', subscribersController);
app.get('/subscriber/find/?phone=:phone', subscribersController);
app.get('/subscriber/find/?customer_id=:id', subscribersController);

function subscribersController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _subscribers.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/deal', dealController);
app.post('/deal/add', dealController);
app.get('/deal/:id', dealController);
app.get('/deal/find/?id=:id', dealController);
app.get('/deal/find/?phone=:phone', dealController);
app.get('/deal/find/?customer_id=:id', dealController);

function dealController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _deal.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/client', clientController);
app.post('/client/add', clientController);
app.get('/client/:id', clientController);
app.get('/client/find/?id=:id', clientController);
app.get('/client/find/?customer_id=:id', clientController);

function clientController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _client.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/bank', bankController);
app.post('/bank/add', bankController);
app.get('/bank/:id', bankController);
app.get('/bank/find/?id=:id', bankController);
app.get('/bank/find/?customer_id=:id', bankController);

function bankController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _bank.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/transaction', transactionController);
app.post('/transaction/add', transactionController);
app.get('/transaction/:id', transactionController);
app.get('/transaction/find/?id=:id', transactionController);
app.get('/transaction/find/?customer_id=:id', transactionController);

function transactionController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _transaction.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/account', accountController);
app.post('/account/add', accountController);
app.delete('/account/:id', accountController);
app.get('/account/:id', accountController);
app.get('/account/find/?id=:id', accountController);
app.get('/account/find/?customer_id=:id', accountController);

function accountController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _account.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/balance', balanceController);
app.post('/balance/add', balanceController);
app.get('/balance/:id', balanceController);
app.delete('/balance/:id', balanceController);
app.get('/balance/find/?id=:id', balanceController);
app.get('/balance/find/?customer_id=:id', balanceController);

function balanceController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _balance.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.listen(9090, () => console.log(`Listening on port 9090` + process.env.PORT || 9090));
//# sourceMappingURL=index.js.map