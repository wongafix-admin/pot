import express from 'express'
import bodyParser from 'body-parser'
import handleDealRequest from './deal'
import handleClientRequest from './client'
import handleAdminRequest from './admin'

import handleTransactionRequest from './transaction'
import handleAccountRequest from './account'
import handleBalanceRequest from './balance'
import handleSubscribersRequest from './subscribers'
import handleUploadsRequest from './uploads'
import handleBankRequest from './bank'

import handleSendmailRequest from './mailer'
import handleCronjobRequest from './cronjob'
import handleSettingsRequest from './settings'

import handleContactRequest from './contact'


import adaptRequest from './helpers/adapt-request'

var cors = require('cors')
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 9090;

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

app.post('/sendmail', sendmailController);

function sendmailController (req, res) {
  const httpRequest = adaptRequest(req)
  handleSendmailRequest(httpRequest)
      .then(({ headers, statusCode, data }) =>
      res
          .set(headers)
          .status(statusCode) 
          .send(data)
      )
      .catch(e => res.status(500).end())
}

app.get('/cronjob/:id', cronjobController);
app.get('/cronjob/find/?start=:now', cronjobController);
app.get('/cronjob/find/?end=:now', cronjobController);

function cronjobController (req, res) {
    const httpRequest = adaptRequest(req)
    handleCronjobRequest(httpRequest)
        .then(({ headers, statusCode, data }) =>
        res
            .set(headers)
            .status(statusCode) 
            .send(data)
        )
        .catch(e => res.status(500).end())
}


app.all('/admin', adminController);
app.post('/admin/add', adminController);
app.post('/admin/auth', adminController);
app.post('/admin/reset', adminController);
app.get('/admin/:id', adminController);
app.get('/admin/find/?email=:email', adminController);

function adminController (req, res) {
    const httpRequest = adaptRequest(req)
    handleAdminRequest(httpRequest)
        .then(({ headers, statusCode, data }) =>
        res
            .set(headers)
            .status(statusCode) 
            .send(data)
        )
        .catch(e => res.status(500).end())
}


app.all('/subscriber', subscribersController);
app.post('/subscriber/add', subscribersController);
app.post('/subscriber/verify', subscribersController);
app.get('/subscriber/:id', subscribersController);
app.get('/subscriber/find/?id=:id', subscribersController);
app.get('/subscriber/find/?phone=:phone', subscribersController);
app.get('/subscriber/find/?customer_id=:id', subscribersController);


function subscribersController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleSubscribersRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}


app.all('/uploads', uploadsController);
app.post('/uploads/add', uploadsController);
app.get('/uploads/:id', uploadsController);
app.get('/uploads/find/?id=:id', uploadsController);
app.get('/uploads/find/?name=:name', uploadsController);
app.get('/uploads/find/?subscriber_id=:id', uploadsController);


function uploadsController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleUploadsRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}


app.all('/deal', dealController);
app.post('/deal/add', dealController);
app.get('/deal/:id', dealController);
app.get('/deal/find/?id=:id', dealController);
app.get('/deal/find/?phone=:phone', dealController);
app.get('/deal/find/?customer_id=:id', dealController);

function dealController (req, res) {
    const httpRequest = adaptRequest(req)
    handleDealRequest(httpRequest)
        .then(({ headers, statusCode, data }) =>
        res
            .set(headers)
            .status(statusCode) 
            .send(data)
        )
        .catch(e => res.status(500).end())
}


app.all('/client', clientController);
app.post('/client/add', clientController);
app.get('/client/:id', clientController);
app.get('/client/find/?id=:id', clientController);
app.get('/client/find/?customer_id=:id', clientController);

function clientController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleClientRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/bank', bankController);
app.post('/bank/add', bankController);
app.get('/bank/:id', bankController);
app.get('/bank/find/?id=:id', bankController);
app.get('/bank/find/?customer_id=:id', bankController);

function bankController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleBankRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/transaction', transactionController);
app.post('/transaction/add', transactionController);
app.get('/transaction/:id', transactionController);
app.get('/transaction/find/?id=:id', transactionController);
app.get('/transaction/find/?customer_id=:id', transactionController);

function transactionController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleTransactionRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}



app.all('/account', accountController);
app.post('/account/add', accountController);
app.delete('/account/:id', accountController);
app.get('/account/:id', accountController);
app.get('/account/find/?id=:id', accountController);
app.get('/account/find/?customer_id=:id', accountController);

function accountController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleAccountRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}


app.all('/balance', balanceController);
app.post('/balance/add', balanceController);
app.get('/balance/:id', balanceController);
app.delete('/balance/:id', balanceController);
app.get('/balance/find/?id=:id', balanceController);
app.get('/balance/find/?customer_id=:id', balanceController);

function balanceController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleBalanceRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}


app.all('/settings', settingsController);
app.post('/settings/add', settingsController);
app.get('/settings/:id', settingsController);
app.get('/settings/find/?id=:id', settingsController);


function settingsController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleSettingsRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/contact', contactController);
app.post('/contact/add', contactController);
app.get('/contact/:id', contactController);
app.get('/contact/find/?id=:id', contactController);


function contactController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleContactRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}



app.listen(port, () => console.log(`Listening on port 9090`+process.env.PORT || 9090));