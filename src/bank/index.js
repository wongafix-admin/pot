import makeDb from '../db';
import makeBankQuery from './bank-query';
import makeBankEndpointHandler from './bank-endpoint';

const database = makeDb();
const bankQuery = makeBankQuery({ database });
const bankEndpointHandler = makeBankEndpointHandler({ bankQuery });

export default bankEndpointHandler;