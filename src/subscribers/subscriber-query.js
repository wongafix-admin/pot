import makeSubscribers from './subscriber';
import sendSms from '../helpers/send-sms';
import { UniqueConstraintError } from '../helpers/errors';

export default function makeSubscribersQuery ({database}){
    return Object.freeze ({
        add,
        verify, 
        findById,
        findByPhone,
        findByCustomerId,
        getSubscribers, 
        deleteByCustomerId,
        update
    });

    async function getSubscribers ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Subscribers')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToSubscribers)
    }


    async function add ({ subscribersId, ...subscribers }) {
        const db = await database
        if (subscribersId) {
          subscribers._id = db.makeId(subscribersId);
        }
        const { result, ops } = await db
          .collection('Subscribers')
          .insertOne(subscribers)
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
            created: documentToSubscribers(ops[0])
        }
    }

  async function verify ({ surname, phone, email }) {
    const db = await database
    const found = await db
      .collection('Subscribers')
      .findOne({ phone:phone })
    

    if (found) {

      const db2 = await database
      const found2 = await db2
        .collection('Subscribers')
        .findOne({ surname:surname })

        if (found2) {
          sendSms("Your subscription has been submitted", "08121631789");
          return {
            status: "success",
            message: "Reord found"
          };

        } else {
          
          return {
            status: "no-surname-error",
            message: "Phone no registered with another SURNAME already"
          };

        }
    }else {
      
      return {
        status: "no-phone-error",
        message: "Phone no registered with another SURNAME already"
      };

    }
  }


    async function update ({ id, ...subscribers }) {
      console.log("Update query called "+id);
      console.log(subscribers);
        const db = await database
        const query = {
          _id: db.makeId(id)
        }
        

        const newSet = {
          $set : {
            surname: subscribers.surname, 
            othernames: subscribers.othernames, 
            gender: subscribers.gender, 
            bday: subscribers.bday, 
            bmonth: subscribers.bmonth, 
            byear: subscribers.byear, 
            email: subscribers.email, 
            phone: subscribers.phone, 
            status: subscribers.status, 
            address: subscribers.address, 

            office_income: subscribers.office_income, 
            office_email: subscribers.office_email, 
            office_phone: subscribers.office_phone, 
            office: subscribers.office, 
            office_payday: subscribers.office_payday,

            loan_amount: subscribers.loan_amount, 
            loan_purpose: subscribers.loan_purpose, 
            loan_type: subscribers.loan_type, 
            loan_duration: subscribers.loan_duration, 
        
            guarantor_name: subscribers.guarantor_name, 
            guarantor_home_address: subscribers.guarantor_home_address, 
            guarantor_office_address: subscribers.guarantor_office_address, 
            guarantor_phone: subscribers.guarantor_phone, 
            guarantor_monthly_income: subscribers.guarantor_monthly_income,
            guarantor_collateral: subscribers.guarantor_collateral, 

            okra_customer_id: subscribers.okra_customer_id, 
            okra_salary_bank: subscribers.okra_salary_bank, 
            okra_num_account: subscribers.okra_num_account, 
            num_deal: subscribers.num_deal, 

            upload_id_card:  subscribers.upload_id_card, 
            upload_picture:  subscribers.upload_picture, 
            reg_status:  subscribers.reg_status, 
            date:  subscribers.date
          } 
        }
        /*if (id) {
          _id = db.makeId(id)
        }*/
        const { result } = await db
          .collection('Subscribers')
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
          .collection('Subscribers')
          .findOne({ _id: id })
        if (found) {
          return documentToSubscribers(found)
        }
        return null
      }

    async function findByPhone ({ phone }) {
      const db = await database
      const found = await db
        .collection('Subscribers')
        .findOne({ phone: phone })
      if (found) {
        console.log("found");
        return documentToSubscribers(found)
      }
      return null
    }

    async function findByCustomerId ({ customer_id }) {
      const db = await database
      const found = await db
        .collection('Subscribers')
        .findOne({ okra_customer_id: customer_id })
      if (found) {
        return documentToSubscribers(found)
      }
      return null
    }

    /*async function remove ({ subscribersId, ...subscribers}) {
      const db = await database
      if (subscribersId) {
          subscribers._id = db.makeId(subscribersId)
      }

      const { result } = await db.collection('Subscribers').deleteMany(subscribers)
      return result.n
    }*/

    async function deleteByCustomerId ({ customer_id }) {
      const db = await database
  
      const { result } = await db.collection('Subscribers').deleteMany({"customer_id": customer_id})
      return {
        success: result.n
      }
      
    }

    function documentToSubscribers ({ _id: id, ...doc }) {
      return makeSubscribers({ id, ...doc })
    }
}