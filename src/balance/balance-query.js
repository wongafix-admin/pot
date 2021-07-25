import makeBalance from './balance'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeBalanceQuery({database}){
    return Object.freeze({
        add,
        findByCustomerId,
        findById,
        getBalance,
        remove,
        deleteById,
        //replace,
        update
    });

    async function getBalance ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Balance')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToBalance)
    }


    async function add ({ balanceId, ...balance }) {
      console.log("Query balance called");
      const db = await database
      
      if (balanceId) {
        balance._id = db.makeId(balanceId)
      }
      const { result, ops } = await db
        .collection('Balance')
        .insertOne(balance)
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
          created: documentToBalance(ops[0])
      }

    }

    async function update ({ id, ...balance }) {
      
        const db = await database
        const query = {
          _id: db.makeId(id)
        }
        
        const newSet = {
          $set : {
            customer_id: balance.customer_id,
            email: balance.email,
            phone: balance.phone,
            bank: balance.bank,
            bank_logo: balance.bank_logo,

            account_id: balance.account_id,
            available_balance: balance.available_balance,
            nuban: balance.nuban,
            ledger_balance: balance.ledger_balance,
            account_name: balance.account_name,
            account_status: balance.account_status,
            account_type: balance.account_type,
            connected: balance.connected,
            date: balance.date
          } 
        }
        /*if (id) {
          _id = db.makeId(id)
        }*/
        const { result } = await db
          .collection('Balance')
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

  async function findById ({ balanceId }) {
    const db = await database
    const found = await db
      .collection('Balance')
      .findOne({ _id: db.makeId(balanceId) })
    if (found) {
      return documentToBalance(found)
    }
    return null
  }

  /*async function findByCustomerId ({ customer_id }) {
    const db = await database
    const found = await db
      .collection('Balance')
      .findOne({ customer_id: customer_id })
    if (found) {
      console.log("found");
      return documentToBalance(found)
    }
    return null
  }*/

  async function findByCustomerId ({ customer_id } = {}) {
    const db = await database;
    const query = { customer_id: customer_id }

    return (await db
    .collection('Balance')
    .find(query)
    .toArray()).map(documentToBalance)
  }

  async function remove ({ balanceId, ...balance }) {
    const db = await database
    if (balanceId) {
        balance._id = db.makeId(balanceId)
    }

    const { result } = await db.collection('Balance').deleteMany(balance)
    return result.n
  }

  async function deleteById ({ id }) {
    console.log("Balance query id "+id);
    const db = await database
    id = db.makeId(id);

    const { result } = await db.collection('Balance').deleteMany({_id: id})
    //return result.n
    if (result) {
      return {
        status: "success",
        message: "Deleted successfully"
      }
    }
    else {
      return {
        status: "error",
        message: "Deleted error"
      }
    }
  }

  function documentToBalance ({ _id: id, ...doc }) {
    return makeBalance({ id, ...doc })
  }
}