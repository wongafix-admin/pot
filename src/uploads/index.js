import makeDb from '../db';
import makeUploadsQuery from './uploads-query';
import makeUploadsEndpointHandler from './uploads-endpoint';

const database = makeDb();
const uploadsQuery = makeUploadsQuery({ database });
const uploadsEndpointHandler = makeUploadsEndpointHandler({ uploadsQuery });

export default uploadsEndpointHandler;