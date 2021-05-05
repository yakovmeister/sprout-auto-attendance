import 'source-map-support/register';
import { logger } from '@libs/logger';
import { clockOut } from '@handlers/scheduleLogout/clockOut.request';
import { wrap } from '@libs/wrapper';
import { errorResponse } from '@libs/middlewares/errorResponse.middleware';
import { GenericError } from '@libs/errors/generic';
import { reportSuccess } from '@libs/notification/slack';

const handler = async () => {
  logger.info({
    message: 'Automatically logging you in'
  });

  const response = await clockOut();

  if (!response.isSuccess) {
    throw new GenericError({
      name: 'Sprout_NotSuccess_Response_Error',
      message: 'Sprout could not process your request and responded with isSuccess = false',
      severity: 'warn',
      status: 400,
      details: response
    });
  }

  logger.info({
    message: 'Reporting to slack...'
  });

  if (process.env.SLACK_NOTIFICATION === 'yes') {
    await reportSuccess(response.message);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response.message
    })
  };
};

export const main = wrap(handler).use(errorResponse);
