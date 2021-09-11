import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeAdmin from './admin';

export default function makeAdminEndpointHandler({adminQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postAdmin(httpRequest)
      
            case 'GET':
              return getAdmin(httpRequest)
          
            case 'DELETE':
              return deleteAdmin(httpRequest)

            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getAdmin (httpRequest) {

      const { id } = httpRequest.queryParams || {}
      const { email } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}

      if (email !== undefined){
        const result = await adminQuery.findByEmail({ email })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }

      }
      else if (id !== undefined ){
        const result = await adminQuery.findById({ id })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }

      }
      else {
        const result = await adminQuery.getAdmin({ max, before, after })

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }

    }

    async function postAdmin (httpRequest) {
        let adminInfo = httpRequest.body
        if (!adminInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            adminInfo = JSON.parse(adminInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
           
          if (httpRequest.path == '/admin/auth'){
            const admin = makeAdmin(adminInfo);
            const result = await adminQuery.auth(admin);
            return {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
              }
          }
          else if (httpRequest.path == '/admin/reset'){
            const admin = makeAdmin(adminInfo);
            const result = await adminQuery.reset(admin);
            console.log(JSON.stringify(result))
            return {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
              }
          }
          else {
            const admin = makeAdmin(adminInfo);
            const result = await adminQuery.add(admin);
            return {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
              }
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

    async function deleteAdmin (httpRequest) {
      //const { customer_id } = httpRequest.pathParams || {}
      const { id } = httpRequest.queryParams || {}
      try {
        const result = await adminQuery.deleteById({ id })
  
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