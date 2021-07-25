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
        email = requiredParam('email'),
        phone = requiredParam('phone'),
        bank = requiredParam('bank'),
        account_id = requiredParam('account_id'),
        account_name = requiredParam('account_name'),
        account_nuban = requiredParam('account_nuban'),
        account_type = requiredParam('account_type'),
        account_connected = requiredParam('account_connected'),
        ...otherInfo
      } = {}) {
        validateName('account_name', account_name)
        validateName('bank', bank)
        return {email, phone, bank, account_id, account_name, account_nuban, account_type, account_connected,  ...otherInfo }
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
