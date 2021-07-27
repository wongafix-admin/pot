import makeBank from './bank'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeBankQuery({database}){
    return Object.freeze({
        add,
        findByCustomerId,
        findById,
        getBank,
        deleteByCustomerId,
        update
    });

    async function getBank ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Bank')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToBank)
    }

    
    async function add ({ bankId, ...bank }) {
        const db = await database
        if (bankId) {
          bank._id = db.makeId(bankId)
        }
        const { result, ops } = await db
          .collection('Bank')
          .insertOne(bank)
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
            created: documentToBank(ops[0])
        }
    }

    async function update ({ id, ...bank }) {
      
        const db = await database
        const query = {
          _id: db.makeId(id)
        }
        
        const newSet = {
          $set : {
            customer_id: bank.customer_id,
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
        }
        /*if (id) {
          _id = db.makeId(id)
        }*/
        const { result } = await db
          .collection('Bank')
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
      .collection('Bank')
      .findOne({ _id: db.makeId(id) })
    if (found) {
      return documentToBank(found)
    }
    return null
  }

  /*async function findByCustomerId ({ customer_id }) {
    const db = await database
    const found = await db
      .collection('Account')
      .findOne({ customer_id: customer_id })
    if (found) {
      console.log("found");
      return documentToAccount(found)
    }
    return null
  }*/

  async function findByCustomerId ({ customer_id } = {}) {
    const db = await database;
    const query = { customer_id: customer_id }

    return (await db
    .collection('Bank')
    .find(query)
    .toArray()).map(documentToBank)
  }
  

  async function deleteByCustomerId ({ customer_id }) {
    const db = await database

    const { result } = await db.collection('Bank').deleteMany({"customer_id": customer_id})
    return {
      success: result.n
    }
  }

  function documentToBank ({ _id: id, ...doc }) {
    return makeBank({ id, ...doc })
  }
}