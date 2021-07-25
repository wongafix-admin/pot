import makeDb from '../db';
import makeAdminQuery from './admin-query';
import makeAdminEndpointHandler from './admin-endpoint';

const database = makeDb();
const adminQuery = makeAdminQuery({database});
const adminEndpointHandler = makeAdminEndpointHandler({ adminQuery });

export default adminEndpointHandler;