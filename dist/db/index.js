"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDb;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

async function makeDb() {
  const MongoClient = _mongodb.default.MongoClient;
  const url = process.env.DATABASE_URL;
  const dbName = 'wongafixDB';
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    keepAlive: true
  });

  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }

  const db = await client.db(dbName);
  db.makeId = makeIdFromString;
  return db;
  /* mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
     if (err) {
         console.log("Error creating database "+err);
     }
     else{
         console.log("Mongodb connected finally");
         //const myDb = db.db('pragmatic');
          const myDb = db.db(dbName);
         myDb.makeId = makeIdFromString
         db.close();
         return myDb
     }
   });
  */

  /*
    const client = new MongoClient(url, { useUnifiedTopology: true }
    )
    
    await client.connect((err, db) => {
      if (err) {
        console.log("Error creating database "+err);
      }
      else{
          console.log("Mongodb connected finally");
          const myDb = db.db(dbName);
          myDb.makeId = makeIdFromString
          return myDb
      }
    })
    //console.log("MongoDB connected!");
  
    */

  /*
  try {
    const db = await client.db(dbName)
    db.makeId = makeIdFromString
    return db
  } catch (e) {
    console.error(e);
  }
  */
}

function makeIdFromString(id) {
  return new _mongodb.default.ObjectID(id);
}
//# sourceMappingURL=index.js.map