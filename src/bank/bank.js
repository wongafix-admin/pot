import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeBank(
    bankInfo = requiredParam('bankInfo')
){
    
    const validBank = validate(bankInfo);
    const normalBank = normalize(validBank);
    return Object.freeze(normalBank);

    function validate ({
        
        ...otherInfo
      } = {}) {
        
        return {...otherInfo }
      }
    
    function validateName (label, name) {
      if (name.length < 2) {
        throw new InvalidPropertyError(
          `Bank ${label} must be at least 2 characters long.`
        )
      }
    }

    function normalize ({ ...otherInfo }) {
      return {
        ...otherInfo,
        //account_name: upperFirst(account_name),
        //bank: upperFirst(bank)
      }
    }
}
