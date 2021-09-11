import makeSettings from './settings'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeSettingsQuery({database}){
    return Object.freeze({
        add,
        findById,
        deleteById,
        getSettings,
        update
    });

    async function getSettings ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Settings')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToSettings)
    }

    
    async function add ({ settingsId, ...settings }) {
        const db = await database
        if (settingsId) {
          settings._id = db.makeId(settingsId)
        }
        const { result, ops } = await db
          .collection('Settings')
          .insertOne(settings)
          .catch(mongoError => {
            const [errorCode] = mongoError.message.split(' ')
            if (errorCode === 'E11000') {
              const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
              throw new UniqueConstraintError(
                //mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
              )
            }
            throw mongoError
          })
        return {
            success: result.ok === 1,
            created: documentToSettings(ops[0])
        }
    }

    async function update ({ id, ...settings }) {
      
        const db = await database
        const query = {
          _id: db.makeId(id)
        }
        
        const newSet = {
          $set : {
            category: settings.category,
            rate: settings.rate,
            date: settings.date
          } 
        }
        /*if (id) {
          _id = db.makeId(id)
        }*/
        const { result } = await db
          .collection('Settings')
          .updateOne(query, newSet, {upsert:true})

          if (result) {
            return {
              status: "success",
              message: "Updated successfully"
            }
          }
          else {
            return {
              status: "error",
              message: "Error updating"
            }
          }
        
    }

  async function findById ({ id }) {
    const db = await database
    const found = await db
      .collection('Settings')
      .findOne({ _id: db.makeId(id) })
    if (found) {
      return documentToSettings(found)
    }
    return null
  }


  async function deleteById ({ id }) { 
    const db = await database

    const { result } = await db.collection('Settings').deleteMany({"_id": db.makeId(id)})
    return {
      success: result.n
    }
    
  }

  function documentToSettings ({ _id: id, ...doc }) {
    return makeSettings({ id, ...doc })
  }
}