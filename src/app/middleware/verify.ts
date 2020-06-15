import { verifyRequest } from '@shopify/koa-shopify-auth';
// import { provide } from 'midway';

// @provide()
// export default class VerifyMiddleware {
//   resolve() {
//     return verifyRequest();
//   }
// }

export default (options) => verifyRequest(options);
