import { handlerPath } from '@libs/handlerResolver';
import { timeOut } from '@libs/timings';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: timeOut
    },
    {
      http: {
        method: 'post',
        path: 'clockout',
        private: true
      }
    }
  ]
};
