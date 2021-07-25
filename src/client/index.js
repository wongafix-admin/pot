import makeDb from '../db' 
import makeClientQuery from './client-query'
import makeClientEndpointHandler from './client-endpoint'

const database = makeDb() 
const clientQuery = makeClientQuery({ database })
const clientEndpointHandler = makeClientEndpointHandler({ clientQuery })

export default clientEndpointHandler 