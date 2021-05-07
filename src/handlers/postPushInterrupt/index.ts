import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'api/v1/auth',
        cors: {
          origin: '*'
        },
        authorizer: {
          name: 'authGoogle',
          identitySource: 'method.request.header.Authorization'
        }
      }
    }
  ]
};
