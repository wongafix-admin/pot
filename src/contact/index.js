import makeDb from '../db' 
import makeContactQuery from './contact-query'
import makeContactEndpointHandler from './contact-endpoint'

const database = makeDb() 
const contactQuery = makeContactQuery({ database })
const contactEndpointHandler = makeContactEndpointHandler({ contactQuery })

export default contactEndpointHandler 