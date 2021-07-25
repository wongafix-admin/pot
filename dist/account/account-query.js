"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAccountQuery;

var _account = _interopRequireDefault(require("./account"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAccountQuery({
  database
}) {
  return Object.freeze({
    add,
    findByCustomerId,
    findById,
    deleteByCustomerId,
    getAccount,
    //remove,
    //replace,
    update
  });

  async function getAccount({
    max = 100,
    before,
    after
  } = {}) {
    const db = await database;
    const query = {};

    if (before || after) {
      query._id = {};
      query._id = before ? { ...query._id,
        $lt: db.makeId(before)
      } : query._id;
      query._id = after ? { ...query._id,
        $gt: db.makeId(after)
      } : query._id;
    }

    return (await db.collection('Account').find(query).limit(Number(max)).toArray()).map(documentToAccount);
  }

  async function add({
    accountId,
    ...account
  }) {
    const db = await database;

    if (accountId) {
      account._id = db.makeId(accountId);
    }

    const {
      result,
      ops
    } = await db.collection('Account').insertOne(account).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError();
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToAccount(ops[0])
    };
  }

  async function update({
    id,
    ...account
  }) {
    const db = await database;
    const query = {
      _id: db.makeId(id)
    };
    const newSet = {
      $set: {
        customer_id: account.customer_id,
        email: account.email,
        phone: account.phone,
        bank: account.bank,
        bank_logo: account.bank_logo,
        account_id: account.account_id,
        account_name: account.account_name,
        account_nuban: account_nuban,
        account_type: account.account_type,
        account_connected: account_connected,
        date: account.date
      }
    };
    /*if (id) {
      _id = db.makeId(id)
    }*/

    const {
      result
    } = await db.collection('Account').updateOne(query, newSet, {
      upsert: true
    });

    if (result) {
      return {
        status: "success",
        message: "Updated successfully"
      };
    } else {
      return {
        status: "error",
        message: "Error updating"
      };
    }
  }

  async function findById({
    accountId
  }) {
    const db = await database;
    const found = await db.collection('Account').findOne({
      _id: db.makeId(accountId)
    });

    if (found) {
      return documentToAccount(found);
    }

    return null;
  }

  async function findByCustomerId({
    customer_id
  } = {}) {
    const db = await database;
    const query = {
      customer_id: customer_id
    };
    return (await db.collection('Account').find(query).toArray()).map(documentToAccount);
  }
  /*async function remove ({ accountId, ...account }) {
    const db = await database
    if (accountId) {
        account._id = db.makeId(accountId)
    }
     const { result } = await db.collection('Account').deleteMany(account)
    return result.n
  }*/


  async function deleteByCustomerId({
    customer_id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Account').deleteMany({
      "customer_id": customer_id
    });
    return {
      success: result.n
    };
  }

  function documentToAccount({
    _id: id,
    ...doc
  }) {
    return (0, _account.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=account-query.js.map