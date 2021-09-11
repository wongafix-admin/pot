import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeSettingss(
    settingsInfo = requiredParam('settingsInfo')
){
    
    const validSettings = validate(settingsInfo);
    const normalSettings= normalize(validSettings);
    return Object.freeze(normalSettings);

    function validate ({
        category = requiredParam('category'),
        ...otherInfo
      } = {}) {
        validateName('category', category)
        return {category, ...otherInfo }
      }
    
    function validateName (label, name) {
      if (name.length < 2) {
        throw new InvalidPropertyError(
          `Settings info ${label} must be at least 2 characters long.`
        )
      }
    }

    function normalize ({ ...otherInfo }) {
      return {
        ...otherInfo,
        // account_name: upperFirst(account_name),
        // bank: upperFirst(bank)
      }
    }
}
