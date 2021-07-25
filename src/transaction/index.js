import makeDb from '../db';
import makeTransactionQuery from './transaction-query';
import makeTransactionEndpointHandler from './transaction-endpoint';

const database = makeDb();
const transactionQuery = makeTransactionQuery({ database });
const transactionEndpointHandler = makeTransactionEndpointHandler({ transactionQuery });

export default transactionEndpointHandler;