import 'source-map-support/register';
import { logger } from '@libs/logger';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import { APIGatewayEvent } from 'aws-lambda';

const handler = async (event: APIGatewayEvent) => {
  logger.info({
    message: 'Fetching user details'
  });

  const {
    email,
    name,
    picture,
    token
  } = event.requestContext.authorizer;

  logger.info({
    message: 'Returning user details'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      email,
      name,
      picture,
      token
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
};

export const main = wrap(handler).use(errorResponse);
