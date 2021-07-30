import makeDb from '../db';
import makeDbQuery from './db-query';
import makeOkraQuery from './okra-query';
import makeCronEndpointHandler from './cron-endpoint';

const database = makeDb();
const dbQuery = makeDbQuery({ database });
const okraQuery = makeOkraQuery();
const cronEndpointHandler = makeCronEndpointHandler({ dbQuery, okraQuery});

export default cronEndpointHandler;