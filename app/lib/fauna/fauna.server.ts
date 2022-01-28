import faunadb from 'faunadb'
import type { Collection, Database, Function as FaunaFunction, Index } from './fauna.types'


const faunaClient = new faunadb.Client({
    // @ts-ignore
    secret: process.env.FAUNA_SECRET || FAUNA_SECRET, // Fallback to FAUNA_SECRET always, as it's guaranteed to be replaced by wrangler
    // Use the correct domain for your database's Region Group. - https://docs.fauna.com/fauna/current/learn/understanding/region_groups
    domain: 'db.us.fauna.com'
});

export function getFaunaError (error: any) {

    const {code, description} = error.requestResult.responseContent.errors[0];
    let status;

    switch (code) {
      case 'instance not found':
        status = 404;
        break;
      case 'instance not unique':
        status = 409;
        break;
      case 'permission denied':
        status = 403;
        break;
      case 'unauthorized':
      case 'authentication failed':
        status = 401;
        break;
      default:
        status = 500;
    }

    return {code, description, status};
}

export type SchemaArray = Collection[] & Database[] & Document[] & FaunaFunction[] & Index[]

export type QueryResponse = {
  data: SchemaArray
}


export { faunaClient }
