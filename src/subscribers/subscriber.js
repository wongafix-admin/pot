import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeSubscriber(
    subscriberInfo = requiredParam('subscriberInfo')
){
  console.log("make subscriber");
    const validSubscriber = validate(subscriberInfo);
    const normalSubscriber = normalize(validSubscriber);
    return Object.freeze(normalSubscriber);

  
    function validate ({
      
        surname = requiredParam('surname'),
        othernames = requiredParam('othernames'),
        loan_amount = requiredParam('loan_amount'),
        /*gender = requiredParam('gender'),
        bday = requiredParam('bday'),
        bmonth = requiredParam('bmonth'),
        byear = requiredParam('byear'),
        phone = requiredParam('phone'),
        address = requiredParam('address'),
    
        office = requiredParam('office'),
        office_phone = requiredParam('office_phone'),
        office_income = requiredParam('office_income'),
        office_payday = requiredParam('office_payday'),
    
        loan_amount = requiredParam('loan_amount'),
        loan_purpose = requiredParam('loan_purpose'),
    
        guarantor_name = requiredParam('guarantor_name'),
        guarantor_home_address = requiredParam('guarantor_home_address'),
        guarantor_office_address = requiredParam('guarantor_office_address'),
        guarantor_phone = requiredParam('guarantor_phone'),
        guarantor_monthly_income = requiredParam('guarantor_monthly_income'),
        guarantor_collateral = requiredParam('guarantor_collateral'),

        okra_customer_id = requiredParam('okra_customer_id'), 
        okra_salary_bank = requiredParam('okra_salary_bank'), 
        okra_num_account = requiredParam('okra_num_account'), 
        num_deal = requiredParam('num_deal'), 
    
        upload_id_card = requiredParam('upload_id_card'),
        reg_status = requiredParam('reg_status'),*/
      
        email,
        office_email,
        ...otherInfo
      } = {}) {
        
        /*validateName('surname', surname);
        validateName('othernames', othernames);
        validateName('office', office);
        validateName('loan_purpose', loan_purpose);
        validateName('guarantor_name', guartantor_name);
        validateName('guarantor_home_address', guarantor_home_address);
        validateName('guarantor_office_address', guarantor_office_address);
        validateName('guarantor_collateral', guarantor_collateral);*/

       
        if (email !== 'Nil'){
          validateEmail(email);
        }
        
        if (office_email !== 'Nil'){
          validateEmail(office_email);
        }
        console.log("validate subscriber");
        return { email, loan_amount, office_email, surname, othernames, ...otherInfo }
      }
    
      function validateName (label, name) {
        if (name.length < 2) {
          throw new InvalidPropertyError(
            `Subscriber's ${label} must be at least 2 characters long.`
          )
        }
      }

      function validateEmail(email){
        if (!isValidEmail(email)) {
            throw new InvalidPropertyError('Invalid email address.')
        }
      }

      function normalize ({ surname, othernames, office, guarantor_name, ...otherInfo }) {
        console.log("Normalize subscriber");
        return {
          ...otherInfo,
          surname: upperFirst(surname),
          othernames: upperFirst(othernames),
          office: upperFirst(office),
          guarantor_name: upperFirst(guarantor_name)
        }
      }
}
