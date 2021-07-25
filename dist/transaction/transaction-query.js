"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTransactionQuery;

var _transaction = _interopRequireDefault(require("./transaction"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeTransactionQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    findByCustomerId,
    getTransactions,
    remove,
    update
  });

  async function getTransactions({
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

    return (await db.collection('Transaction').find(query).limit(Number(max)).toArray()).map(documentToTransaction);
  }

  async function add({
    transactionId,
    ...transaction
  }) {
    const db = await database;

    if (transactionId) {
      transaction._id = db.makeId(transactionId);
    }

    const {
      result,
      ops
    } = await db.collection('Transaction').insertOne(transaction).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError();
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToTransaction(ops[0])
    };
  }

  async function update({
    id,
    ...transaction
  }) {
    const db = await database;
    const query = {
      _id: db.makeId(id)
    };
    const newSet = {
      $set: {
        surname: transaction.surname,
        othernames: transaction.othernames,
        email: transaction.email,
        phone: transaction.phone,
        customer_id: transaction.customer_id,
        payment_id: transaction.payment_id,
        amount: transaction.amount,
        paid_month: transaction.paid_month,
        paid_year: transaction.paid_year,
        bank: transaction.bank,
        account_id: transaction.account_id,
        account_name: transaction.account_name,
        account_type: transaction.account_type,
        status: transaction.status,
        date: transaction.date
      }
    };
    /*if (id) {
      _id = db.makeId(id)
    }*/

    const {
      result
    } = await db.collection('Transaction').updateOne(query, newSet, {
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
    transactionId
  }) {
    const db = await database;
    const found = await db.collection('Transaction').findOne({
      _id: db.makeId(transactionId)
    });

    if (found) {
      return documentToTransaction(found);
    }

    return null;
  }

  async function findByCustomerId({
    customer_id
  }) {
    const db = await database;
    return (await db.collection('Transaction').find({
      customer_id: customer_id
    }).toArray()).map(documentToTransaction);
  }

  async function remove({
    transactionId,
    ...transaction
  }) {
    const db = await database;

    if (transactionId) {
      transaction._id = db.makeId(transactionId);
    }

    const {
      result
    } = await db.collection('Transaction').deleteMany(transaction);
    return result.n;
  }

  function documentToTransaction({
    _id: id,
    ...doc
  }) {
    return (0, _transaction.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=transaction-query.js.map