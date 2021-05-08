import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'api/v1/interrupts/{date}',
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
