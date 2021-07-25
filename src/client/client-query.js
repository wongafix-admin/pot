import makeClient from './client'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeClientQuery({database}){
    return Object.freeze({
        add,
        findByCustomerId,
        findById,
        getClients,
        remove,
        update
    });

    async function getClients ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {};
        if (before || after) {
            query._id = {}
            query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
            query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Client')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToClient)
    }


    async function add ({ clientId, ...client }) {
        const db = await database
        if (clientId) {
          client_id = db.makeId(clientId)
        }
        const { result, ops } = await db
          .collection('Client')
          .insertOne(client)
          .catch(mongoError => {
            const [errorCode] = mongoError.message.split(' ')
            if (errorCode === 'E11000') {
              const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
              throw new UniqueConstraintError(
                mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
              )
            }
            throw mongoError
          })
        return {
            success: result.ok === 1,
            created: documentToClient(ops[0])
        }
    } 

    async function findById ({ clientId }) {
      console.log(("Find by id called"));
      const db = await database
      const found = await db
        .collection('Client')
        .findOne({ _id: db.makeId(clientId) })
      if (found) {
        return documentToClient(found)
      }
      return null
    }


  async function findByCustomerId ({ customer_id }) {
    const db = await database
    const found = await db
      .collection('Client')
      .findOne({ okra_customer_id: customer_id })
    if (found) {
      console.log("found");
      return documentToClient(found)
    }
    return null
  }


  async function update ({ id, ...client }) {
      const db = await database
      const query = {
        _id: db.makeId(id)
      }
      
      const newSet = {
        $set : {
          surname: client.surname, 
          othernames: client.othernames,
          gender: client.gender,
          bday: client.bday,
          bmonth: client.bmonth,
          byear: client.byear,
          email: client.email,
          phone: client.phone,
          marital: client.marital,
          address: client.address,

          office: client.office,
          office_phone: client.office_phone,
          office_email: client.office_email,
          office_income: client.office_income,
          office_payday: client.office_payday,

          upload_id_card: client.upload_id_card,

          okra_customer_id: client.okra_customer_id,
          num_deal: client.num_deal,
          password: client.password,
          oripass: client.oripass,
          status: client.status,
          date:  client.date

          /*guarantor_name: client.guarantor_name,
          guarantor_home_address: client.guarantor_home_address,
          guarantor_office_address:client.guarantor_office_address,
          guarantor_phone: client.guarantor_phone,*/

          
        } 
      }
      /*if (id) {
        _id = db.makeId(id)
      }*/
      const { result } = await db
        .collection('Client')
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
    async function remove ({ clientId, ...client }) {
        const db = await database
        if (clientId) {
            client._id = db.makeId(clientId)
        }

        const { result } = await db.collection('Client').deleteMany(client)
        return result.n
    }

    function documentToClient ({ _id: id, ...doc }) {
        return makeClient({ id, ...doc })
    }
}