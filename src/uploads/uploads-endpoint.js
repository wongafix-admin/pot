import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeUploads from './uploads';

export default function makeUploadsEndpointHandler({uploadsQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postUploads(httpRequest)
      
            case 'GET':
              return getUploads(httpRequest)

            case 'DELETE':
                return  deleteUpload(httpRequest)

            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getUploads (httpRequest) {
     
      //const { id } = httpRequest.pathParams || {}
      const { id } = httpRequest.queryParams || {}
      const { name } = httpRequest.queryParams || {}
      const { subscriber_id } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}

      if (name !== undefined){
        const result = await uploadsQuery.findByName({ name })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }

      }
      else if (subscriber_id !== undefined ){
        const result = await uploadsQuery.findBySubscriberId({ subscriber_id })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }

      }
      else if (id !== undefined ){
        const result = await uploadsQuery.findById({ id })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }

      }
      else {
        const result = await uploadsQuery.getUploads({ max, before, after })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }
        
    }

    async function postUploads (httpRequest) {
      let uploadsInfo = httpRequest.body
      if (!uploadsInfo) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. No POST body.'
        })
      }
  
      if (typeof httpRequest.body === 'string') {
        try {
          uploadsInfo = JSON.parse(uploadsInfo)
        } catch {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. POST body must be valid JSON.'
          })
        }
      }
  
      try {
        const uploads = makeUploads(uploadsInfo);
        const result = await uploadsQuery.add(uploads)
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 201,
          data: JSON.stringify(result)
        }
      } catch (e) {
        return makeHttpError({
          errorMessage: e.message,
          statusCode:
            e instanceof UniqueConstraintError
              ? 409
              : e instanceof InvalidPropertyError ||
                e instanceof RequiredParameterError
                ? 400
                : 500
        })
      }
     
    }

    async function deleteUpload (httpRequest) {
      //const { customer_id } = httpRequest.pathParams || {}
      const { subscriber_id } = httpRequest.queryParams || {}
      try {
        const result = await uploadsQuery.deleteBySubscriberId({ subscriber_id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
      }
      catch (e){
        return makeHttpError({
          errorMessage: e.message,
          statusCode:
            e instanceof UniqueConstraintError
              ? 409
              : e instanceof InvalidPropertyError ||
                e instanceof RequiredParameterError
                ? 400
                : 500
        })
  
      }
      
    }
}