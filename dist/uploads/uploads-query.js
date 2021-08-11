"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUploadsQuery;

var _uploads = _interopRequireDefault(require("./uploads"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeUploadsQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    findBySubscriberId,
    getUploads,
    deleteBySubscriberId
  });

  async function getUploads({
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

    return (await db.collection('Uploads').find(query).limit(Number(max)).toArray()).map(documentToUploads);
  }

  async function add({
    uploadId,
    ...upload
  }) {
    const db = await database;

    if (uploadId) {
      upload._id = db.makeId(uploadId);
    }

    const {
      result,
      ops
    } = await db.collection('Uploads').insertOne(upload).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError();
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToUploads(ops[0])
    };
  }

  async function findById({
    id
  }) {
    const db = await database;
    const found = await db.collection('Uploads').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToUploads(found);
    }

    return null;
  }

  async function findBySubscriberId({
    subscriber_id
  } = {}) {
    const db = await database;
    const query = {
      subscriber_id: subscriber_id
    };
    return (await db.collection('Uploads').find(query).toArray()).map(documentToUploads);
  }

  async function deleteBySubscriberId({
    subscriber_id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Uploads').deleteMany({
      "subscriber_id": subscriber_id
    });
    return {
      success: result.n
    };
  }

  function documentToUploads({
    _id: id,
    ...doc
  }) {
    return (0, _uploads.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=uploads-query.js.map