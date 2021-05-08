import 'source-map-support/register';
import { logger } from '@libs/logger';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import fetchScheds from '@handlers/getSchedules/fetchScheds';

const handler = async () => {
  logger.info({
    message: 'Getting Schedules'
  });

  const scheds = await fetchScheds();

  logger.info({
    message: 'Interrupt fetched'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ scheds }),
    headers: {
      'Allow-Access-Control-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
};

export const main = wrap(handler).use(errorResponse);
