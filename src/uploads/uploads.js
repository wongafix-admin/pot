import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeUploads(
    uploadInfo = requiredParam('uploadInfo')
){
  
    const validUpload = validate(uploadInfo);
    const normalUpload = normalize(validUpload);
    return Object.freeze(normalUpload);

  
    function validate ({
      
      subscriber_id = requiredParam('subscriber_id'),
      name = requiredParam('name'),
        ...otherInfo
      } = {}) {
        
        validateName('subscriber_id', subscriber_id);
        validateName('name', name);
        return { subscriber_id, name, ...otherInfo }
      }
    
      function validateName (label, name) {
        if (name.length < 2) {
          throw new InvalidPropertyError(
            `Upload ${label} must be at least 2 characters long.`
          )
        }
      }

      function normalize ({ name, ...otherInfo }) {
        return {
          ...otherInfo,
          name: upperFirst(name),
        }
      }
}
