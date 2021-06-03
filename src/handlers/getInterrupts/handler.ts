import 'source-map-support/register';
import { logger } from '@libs/logger';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import fetchInterrupts from '@handlers/getInterrupts/fetchInterrupts';

const handler = async () => {
  logger.info({
    message: 'Getting interrupts'
  });

  const interrupts = await fetchInterrupts();

  logger.info({
    message: 'Interrupt fetched'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ interrupts }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
};

export const main = wrap(handler).use(errorResponse);
