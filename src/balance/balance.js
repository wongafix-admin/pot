import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeBalance(
    balanceInfo = requiredParam('balanceInfo')
){
  console.log("Make Balance called");
    const validBalance = validate(balanceInfo);
    const normalBalance= normalize(validBalance);
    return Object.freeze(normalBalance);

    function validate ({
        
        ...otherInfo
      } = {}) {
        //validateName('account_name', account_name)
        //validateName('bank', bank)
        console.log("Validate balance called");
        return {...otherInfo }
      }
    
   

    function normalize ({...otherInfo }) {
      console.log("Normalize balance called");
      return {
        ...otherInfo
      }
    }
}
