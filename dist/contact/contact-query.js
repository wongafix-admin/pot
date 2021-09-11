"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeContactQuery;

var _contact = _interopRequireDefault(require("./contact"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeContactQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    getContacts,
    deleteById
  });

  async function getContacts({
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

    return (await db.collection('Contact').find(query).limit(Number(max)).toArray()).map(documentToContact);
  }

  async function add({
    contactId,
    ...contact
  }) {
    console.log("query called");
    const db = await database;

    if (contactId) {
      contact_id = db.makeId(contactId);
    }

    const {
      result,
      ops
    } = await db.collection('Contact').insertOne(contact).catch(mongoError => {
      console.log("mongo error");
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError(mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId');
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToContact(ops[0])
    };
  }

  async function findById({
    id
  }) {
    const db = await database;
    const found = await db.collection('Contact').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToContact(found);
    }

    return null;
  }

  async function deleteById({
    id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Contact').deleteMany({
      "_id": id
    });
    return {
      success: result.n
    };
  }

  function documentToContact({
    _id: id,
    ...doc
  }) {
    return (0, _contact.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=contact-query.js.map