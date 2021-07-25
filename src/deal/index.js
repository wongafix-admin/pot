import makeDb from '../db';
import makeDealQuery from './deal-query';
import makeDealEndpointHandler from './deal-endpoint';

const database = makeDb();
const dealQuery = makeDealQuery({ database });
const dealEndpointHandler = makeDealEndpointHandler({ dealQuery });

export default dealEndpointHandler;