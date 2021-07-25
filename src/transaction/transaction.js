import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeTransaction(
    transactionInfo = requiredParam('transactionInfo')
){
    
    const validTransaction = validate(transactionInfo);
    const normalTransaction = normalize(validTransaction);
    return Object.freeze(normalTransaction);

    function validate ({
        /*customer_id = requiredParam('customer_id'),
        payment_id = requiredParam('payment_id'),
        amount = requiredParam('amount'),
        paid_month = requiredParam('paid_month'),
        paid_year = requiredParam('paid_year'),
        bank = requiredParam('bank'),
        account_id = requiredParam('account_id'),
        account_name = requiredParam('account_name'),
        account_type = requiredParam('account_type'),
        status = requiredParam('status'),*/
        ...otherInfo
    } = {}) {
        
        return { ...otherInfo }
    }

    /*function validateName (label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(
            `Property's ${label} must be at least 2 characters long.`
            )
        }
    }*/

    function normalize ({...otherInfo }) {

        
        return {
            ...otherInfo
        }
    }

    /*function formatPrice(price){
        var formatter = new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        });

        return formatter.price;
    }*/
}
