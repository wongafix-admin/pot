"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = okraCrons;

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _okraJs = _interopRequireDefault(require("okra-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetch = require('node-fetch');

function okraCrons() {
  //get the deal for the defaulters
  //check the account associated with each deal for more than amount
  //initiate payment on account
  //register transaction
  const dd = new Date();
  const today = dd.getDate();
  const sDay = today - 2;
  const eDay = today + 5;
  getDeals();

  async function getDeals() {
    const deals = await db.collection('Deal').find({
      loan_due_date: {
        $gt: sDay,
        $lt: eDay
      }
    }, {
      pay_status: 'Unpaid'
    }, {
      status: {
        $not: 'Completed'
      }
    }).toArray();

    for (const deal of deals) {
      const accounts = await db.collection('Account').find({
        customer_id: deal.customer_id
      }).toArray();

      for (const account of accounts) {
        //okra check balance
        // data to be sent to the POST request
        const balance = await fetch('https://api.okra.ng/v2/balance/refresh', {
          method: 'POST',
          headers: {
            Accept: 'application/json; charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            account_id: account.account_id
          })
        });
        const balRes = await balance.json();
        await timeout(6000);
        const balance_callback = await fetch(balRes.callback_url, {
          method: 'POST',
          headers: {
            Accept: 'application/json; charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
            'Content-Type': 'application/json'
          }
        });
        const callbackRes = await balance_callback.json();

        if (callbackRes.available_balance >= deal.loan_monthly_payable) {
          const pay = await fetch('https://api.okra.ng/v2/pay/initiate', {
            method: 'POST',
            headers: {
              Accept: 'application/json; charset=utf-8',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              account_to_debit: account.account_id,
              amount: deal.loan_monthly_payable * 100,
              currency: 'NGN'
            })
          });
          const payRes = await pay.json(); //create transaction in db

          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const d = new Date();
          const trans = {
            surname: deal.surname,
            othernames: deal.othernames,
            email: deal.email,
            phone: deal.phone,
            customer_id: deal.customer_id,
            payment_id: payRes.data.payment.id,
            amount: deal.loan_monthly_payable,
            paid_month: monthNames[d.getMonth()],
            paid_year: d.getFullYear(),
            bank: account.bank,
            account_id: account.account_id,
            account_name: account.account_name,
            account_type: account.account_type,
            status: 'Paid',
            date: new Date()
          };
          await db.collection('Transaction').insertOne(trans).catch(mongoError => {
            const [errorCode] = mongoError.message.split(' ');

            if (errorCode === 'E11000') {
              const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
              throw new UniqueConstraintError();
            }

            throw mongoError;
          });
          break;
        }
      }
    }
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
//# sourceMappingURL=index.js.map