import makeDb from '../db';
import makeBalanceQuery from './balance-query';
import makeBalanceEndpointHandler from './balance-endpoint';

const database = makeDb();
const balanceQuery = makeBalanceQuery({ database });
const balanceEndpointHandler = makeBalanceEndpointHandler({ balanceQuery });

export default balanceEndpointHandler;