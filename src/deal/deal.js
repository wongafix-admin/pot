import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeDeal(
    dealInfo = requiredParam('dealInfo')
){
    
    const validDeal = validate(dealInfo);
    const normalDeal= normalize(validDeal);
    return Object.freeze(normalDeal);

    function validate ({
        customer_id = requiredParam('customer_id'),
        status = requiredParam('status'),
        ...otherInfo
      } = {}) {
        //validateName('surname', surname)
        //validateName('othernames', othernames)
        return {customer_id, status,  ...otherInfo }
      }
    
      

      function normalize ({ surname, othernames, ...otherInfo }) {
        return {
          ...otherInfo,
          surname: upperFirst(surname),
          othernames: upperFirst(othernames)
        }
      }
}
