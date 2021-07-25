require('dotenv').config();
import mongodb from 'mongodb';



export default async function makeDb () {

  const MongoClient = mongodb.MongoClient
  const url = process.env.DATABASE_URL;
  const dbName = 'wongafixDB'

  const client = new MongoClient(url, { useUnifiedTopology: true, keepAlive: true,
    })

  try {
    await client.connect()
  } catch (e) {
    console.error(e);
  }
  
  const db = await client.db(dbName)
  db.makeId = makeIdFromString
  return db

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

function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}