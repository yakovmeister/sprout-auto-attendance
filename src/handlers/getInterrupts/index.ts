import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'api/v1/interrupts',
        cors: {
          origin: '*'
        },
        // authorizer: {
        //   name: 'authGoogle',
        //   identitySource: 'method.request.header.Authorization'
        // }
      }
    }
  ]
};
