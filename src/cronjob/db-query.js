import { UniqueConstraintError } from '../helpers/errors'

export default function makeDbQuery({database}){
    return Object.freeze({
      getDeals,
      getAccountByCustomerId,
      addTransaction,
      updateDeal
    });

    async function getDeals ({ sDay, eDay, pay_status, status, condition } = {}) {
      console.log("Start day: "+sDay);
      console.log("End day: "+eDay);
        const db = await database;
       
        if (condition == 'Abnormal_28'){
          return (await db
            .collection('Deal')
            .find({loan_due_date: { $gt : sDay , $lt : 29 } }, {loan_due_date: { $gt : 0, $lt : eDay } }, {pay_status: pay_status}, {status: {$not: status}})
            .toArray())
        }
        else if (condition == 'Abnormal_30'){
          return (await db
            .collection('Deal')
            .find({loan_due_date: { $gt : sDay , $lt : 31 } }, {loan_due_date: { $gt : 0, $lt : eDay } }, {pay_status: pay_status}, {status: {$not: status}})
            .toArray())
        }
        else if (condition == 'Abnormal_31'){
          return (await db
            .collection('Deal')
            .find({loan_due_date: { $gt : sDay , $lt : 32 } }, {loan_due_date: { $gt : 0, $lt : eDay } }, {pay_status: pay_status}, {status: {$not: status}})
            .toArray())
        }
        else {
          return (await db
            .collection('Deal')
            .find({loan_due_date: { $gt : sDay , $lt : eDate } }, {pay_status: pay_status}, {status: {$not: status}})
            .toArray())
        }
    }

    async function getAccountByCustomerId ({ customer_id }) {
      const db = await database;
      
      return (await db
        .collection('Account')
        .find({ customer_id: customer_id })
        .toArray())
    }



    async function addTransaction({ transId, ...transaction }) {
        const db = await database
        if (transId) {
          trans._id = db.makeId(transId)
        }
        const { result, ops } = await db
          .collection('Transaction')
          .insertOne(transaction)
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
            created: true
        }
    }

    async function updateDeal ({ id, ...deals }) {
      
        const db = await database
        const query = {
          _id: db.makeId(id)
        }
        
        const newSet = {
          $set : {

            surname: deals.surname,
            othernames: deals.othernames,
            customer_id: deals.customer_id,
            phone: deals.phone,
            email: deals.email,
            loan_amount: deals.loan_amount,
            loan_monthly_payable: deals.loan_monthly_payable,
            loan_due_date: deals.loan_due_date,
            last_month_paid: deals.last_month_paid,
            last_year_paid: deals.last_year_paid,

            office: deals.office,
            office_phone: deals.office_phone,
            office_email: deals.office_email, 
            
            guarantor_name: deals.guarantor_name,
            guarantor_home_address: deals.guarantor_home_address,
            guarantor_office_address: deals.guarantor_office_address,
            guarantor_phone: deals.guarantor_phone,
            guarantor_monthly_income: deals.guarantor_monthly_income,
            guarantor_collateral: deals.guarantor_collateral,
            
            salary_bank: deals.salary_bank,
            num_account: deals.num_account,

            upload_id_card: deals.upload_id_card,

            pay_status: deals.pay_status,
            status: deals.status,
            date: deals.date
          } 
        }
        /*if (id) {
          _id = db.makeId(id)
        }*/
        const { result } = await db
          .collection('Deal')
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

  /*async function findById ({ id }) {
    const db = await database
    const found = await db
      .collection('Deal')
      .findOne({ _id: db.makeId(id) })
    if (found) {
      return documentToDeal(found)
    }
    return null
  }

  

  async function deleteByCustomerId ({ customer_id }) {
    const db = await database

    const { result } = await db.collection('Deal').deleteMany({"customer_id": customer_id})
    return {
      success: result.n
    }
  }

  async function deleteById ({ id }) {
    const db = await database

    const { result } = await db.collection('Deal').deleteOne({"_id": db.makeId(id)})
    console.log(result);
    if (result.deletedCount > 0){
      return {
        status: "Success"
      }
    }
    else {
      return {
        status: "Error"
      }
    }
  }

  function documentToDeal ({ _id: id, ...doc }) {
    return makeDeal({ id, ...doc })
  }*/

}