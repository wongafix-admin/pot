/*import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../helpers/errors';
import makeHttpError from '../helpers/http-error';
import makeSubscribers from './subscriber';

export default function makeSubscribersEndpointHandler({subscribersQuery}){
  return async function handle(httpRequest){
      switch (httpRequest.method) {
          case 'POST':
            return postSubscribers(httpRequest)
    
          case 'GET':
            return getSubscribers(httpRequest)

          case 'PUT':
              return updateSubscribers(httpRequest)
    
          default:
            return makeHttpError({
              statusCode: 405,
              errorMessage: `${httpRequest.method} method not allowed.`
            })
      }
  }

};*/