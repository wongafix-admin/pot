import makeDb from '../db';
import makeAccountQuery from './account-query';
import makeAccountEndpointHandler from './account-endpoint';

const database = makeDb();
const accountQuery = makeAccountQuery({ database });
const accountEndpointHandler = makeAccountEndpointHandler({ accountQuery });

export default accountEndpointHandler;