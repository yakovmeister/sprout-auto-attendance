import 'source-map-support/register';
import { logger } from '@libs/logger';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import deleteInterrupt from '@handlers/cancelInterrupt/deleteInterrupt';
import { APIGatewayEvent } from 'aws-lambda';

const handler = async (event: APIGatewayEvent) => {
  logger.info({
    message: 'Cancelling interrupt'
  });

  const date = +event.pathParameters.date;

  await deleteInterrupt(date);
  
  logger.info({
    message: 'Interrupt cancelled'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Interrupt for ${date} is now cancelled`
    }),
    headers: {
      'Allow-Access-Control-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
};

export const main = wrap(handler).use(errorResponse);
