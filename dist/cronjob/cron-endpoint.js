"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCronEndpointHandler;

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schedule = require('node-schedule');

function makeCronEndpointHandler({
  dbQuery,
  okraQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getCronJob(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getCronJob(httpRequest) {
    const {
      start
    } = httpRequest.queryParams || {};
    const {
      end
    } = httpRequest.queryParams || {};

    if (start !== undefined) {
      //var payJob = schedule.scheduleJob('paycron', '*/5 * * * * *', ()=>{
      //  setMakePayment ();
      //});
      const result = await setMakePayment();
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else {
      schedule.cancelJob('paycron');
      console.log("Cron cancelled");
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        status: "success"
      };
    }
  }

  async function setMakePayment() {
    //const account_id = "60ec491c12e3c4c9a4023980";
    //const result = await okraQuery.balanceRefresh({account_id});
    //console.log("endpoint result: "+JSON.stringify(result));
    const dd = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[dd.getMonth()];
    var today = dd.getDate();
    var sDay = today - 2;
    var eDay = today + 3;
    var pay_status = "Unpaid";
    var status = "Completed";
    var condition;

    if (sDay < 0) {
      eDay = eDay + 1;
      sDay = 1;
    }

    if (month == 'February') {
      if (eDay > 28) {
        condition = 'Abnormal_28';
        eDay = eDay - 28;
      } else {
        condition = 'Normal';
      }
    } else if (month == 'June' || month == 'April' || month == 'September' || month == 'November') {
      if (eDay > 30) {
        condition = 'Abnormal_30';
        eDay = eDay - 30;
      } else {
        condition = 'Normal';
      }
    } else {
      if (eDay > 31) {
        condition = 'Abnormal_31';
        eDay = eDay - 31;
      } else {
        condition = 'Normal';
      }
    }

    const deals = await dbQuery.getDeals({
      sDay,
      eDay,
      pay_status,
      status,
      condition
    }); //return deals;

    console.log(deals);
    var counter = 0;

    for (const deal of deals) {
      counter++;
      const customer_id = deal.customer_id;
      const accounts = await dbQuery.getAccountByCustomerId({
        customer_id
      });

      for (const account of accounts) {
        const nAccount = {
          account_id: account.account_id
        };
        const balance = await okraQuery.balanceRefresh({
          nAccount
        });
        const balRes = await balance.json();
        await timeout(6000);
        const callback_url = balRes.callback_url;
        const balance_callback = await okraQuery.balanceCallback({
          callback_url
        });
        const callbackRes = await balance_callback.json();

        if (callbackRes.available_balance >= deal.loan_monthly_payable) {
          const nPay = {
            account_to_debit: account.account_id,
            amount: deal.loan_monthly_payable * 1000,
            currency: 'NGN'
          };
          const pay = await okraQuery.payInitiate({
            nPay
          });
          const payRes = await pay.json();
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const d = new Date();
          const transx = {
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
          await okraQuery.addTransaction({
            transx
          });
          await okraQuery.updateDeal({
            deal
          });
          break;
        }
      }

      if (deals.length == counter) {
        console.log(deals.length);
        console.log(counter);
        return {
          statusCode: 200,
          status: "success"
        };
      }
    }

    if (deals.length == 0) {
      console.log(deals.length);
      console.log(counter);
      return {
        statusCode: 200,
        status: "success"
      };
    }
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
//# sourceMappingURL=cron-endpoint.js.map