import 'source-map-support/register';
import { logger } from '@libs/logger';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import { middleware, RequestValidationParam } from '@handlers/postPushInterrupt/request.validation';
import pushInterrupt from '@handlers/postPushInterrupt/pushInterrupt';
import { APIGatewayEvent } from 'aws-lambda';

const handler = async (event: APIGatewayEvent) => {
  logger.info({
    message: 'Adding new interrupt'
  });

  await pushInterrupt((event.body as RequestValidationParam).date);

  logger.info({
    message: 'Interrupt added'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Interrupt added'
    }),
    headers: {
      'Allow-Access-Control-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
};

export const main = wrap(handler)
  .use(middleware)
  .use(errorResponse);
