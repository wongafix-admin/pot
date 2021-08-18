import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeDeal(
    dealInfo = requiredParam('dealInfo')
){
  console.log("makedeal called");
    const validDeal = validate(dealInfo);
    const normalDeal= normalize(validDeal);
    return Object.freeze(normalDeal);

    function validate ({
        // customer_id = requiredParam('customer_id'),
        // status = requiredParam('status'),
        ...otherInfo
      } = {}) {
        //validateName('surname', surname)
        //validateName('othernames', othernames)
        console.log("validate deal called");
        return {...otherInfo }
      }
    
      

      function normalize ({ ...otherInfo }) {
        console.log("deal normalize");
        return {
          ...otherInfo
        }
      }
}
