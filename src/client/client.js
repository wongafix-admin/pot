import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeClient(
    clientInfo = requiredParam('clientInfo')
){
    console.log("make client!");
    const validClient = validate(clientInfo);
    const normalClient= normalize(validClient);
    return Object.freeze(normalClient);

    function validate ({
        
        ...otherInfo
      } = {}) {
        
        console.log("Validated!");
        return {...otherInfo }
      }
    
      /*function validateName (label, name) {
        if (name.length < 2) {
          throw new InvalidPropertyError(
            `Activity's ${label} must be at least 2 characters long.`
          )
        }
      }*/

      function normalize ({...otherInfo }) {
        return {
          ...otherInfo
        }
      }
}
