import makeDb from '../db';
import makeSubscribersQuery from './subscriber-query';
import makeSubscribersEndpointHandler from './subscriber-endpoint';

const database = makeDb();
const subscribersQuery = makeSubscribersQuery({ database });
const subscribersEndpointHandler = makeSubscribersEndpointHandler({ subscribersQuery });

export default subscribersEndpointHandler;