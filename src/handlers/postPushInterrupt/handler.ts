import 'source-map-support/register';
import { logger } from '@libs/logger';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import { APIGatewayEvent } from 'aws-lambda';

const handler = async (event: APIGatewayEvent) => {
  logger.info({
    message: 'Verifying authentication'
  });

  const {
    email,
    name,
    picture,
    token
  } = event.requestContext.authorizer;

  return {
    statusCode: 200,
    body: JSON.stringify({
      email,
      name,
      picture,
      token
    }),
    headers: {
      'Allow-Access-Control-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
};

export const main = wrap(handler).use(errorResponse);
