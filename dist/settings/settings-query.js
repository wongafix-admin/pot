"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSettingsQuery;

var _settings = _interopRequireDefault(require("./settings"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSettingsQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    deleteById,
    getSettings,
    update
  });

  async function getSettings({
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

    return (await db.collection('Settings').find(query).limit(Number(max)).toArray()).map(documentToSettings);
  }

  async function add({
    settingsId,
    ...settings
  }) {
    const db = await database;

    if (settingsId) {
      settings._id = db.makeId(settingsId);
    }

    const {
      result,
      ops
    } = await db.collection('Settings').insertOne(settings).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError();
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToSettings(ops[0])
    };
  }

  async function update({
    id,
    ...settings
  }) {
    const db = await database;
    const query = {
      _id: db.makeId(id)
    };
    const newSet = {
      $set: {
        category: settings.category,
        rate: settings.rate,
        date: settings.date
      }
    };
    /*if (id) {
      _id = db.makeId(id)
    }*/

    const {
      result
    } = await db.collection('Settings').updateOne(query, newSet, {
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
    id
  }) {
    const db = await database;
    const found = await db.collection('Settings').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToSettings(found);
    }

    return null;
  }

  async function deleteById({
    id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Settings').deleteMany({
      "_id": db.makeId(id)
    });
    return {
      success: result.n
    };
  }

  function documentToSettings({
    _id: id,
    ...doc
  }) {
    return (0, _settings.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=settings-query.js.map