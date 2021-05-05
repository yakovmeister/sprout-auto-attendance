import { handlerPath } from '@libs/handlerResolver';
import { timeIn } from '@libs/timings';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: timeIn
    },
    {
      http: {
        method: 'post',
        path: 'clockin',
        private: true
      }
    }
  ]
};
