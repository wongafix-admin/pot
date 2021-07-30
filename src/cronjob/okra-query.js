import { UniqueConstraintError } from '../helpers/errors'
import Okra from 'okra-js';

const fetch = require('node-fetch');

export default function makeOkraQuery(){
    return Object.freeze({
      balanceRefresh,
      balanceCallback,
      payInitiate
    });

    async function balanceRefresh ({ account_id } = {}) {
      console.log("account id query "+account_id);
      

      const body = {
        account_id : account_id
      
      };

      /*let response = await fetch('https://api.okra.ng/v2/products/complete-view/process', {
        method: 'POST',
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      return await response;*/

      return fetch('https://api.okra.ng/v2/balance/refresh', {
        method: 'POST',
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return json;
      });
    
      

      
      
    }

    async function balanceCallback({ callback_url } = {}) {
        
      return fetch(callback_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        return json;
      });

    }

    async function payInitiate({ nPay } = {}) {

      return fetch('https://api.okra.ng/v2/pay/initiate', {
        method: 'POST',
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2ZWU3Mjc4ZGUwZjExZDVkMWJlMGIiLCJpYXQiOjE2MTg0MDcwMjd9.Q-R0qocVPKnCZHtpGigsTtoN-MVlUIhZ9LsSrW7VCsM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nPay)
      })
      .then(res => res.json())
      .then(json => {
        return json;
      });
    
    }


}