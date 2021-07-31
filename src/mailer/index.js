import makeDb from '../db';
import makeQuery from './query';

const database = makeDb();
const queryHandler = makeQuery();

export default queryHandler;