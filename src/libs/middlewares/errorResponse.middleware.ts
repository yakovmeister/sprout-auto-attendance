import { logger as log } from '@libs/logger';
import middy from '@middy/core';
import { reportError } from '@libs/notification/slack';

const identifyLogMethod = (severity: string) => {
  const validLoggers = ['debug', 'warn', 'error'];

  if (validLoggers.includes(severity)) {
    return log[severity];
  }

  return log.error;
};

export const errorResponse = {
  onError: async (handler: middy.HandlerLambda, next: middy.NextFunction) => {
    const error = handler.error as any;
    const statusCode = error.status ?? 500;
    const logger = identifyLogMethod(error.severity ?? 'error');
    const baseLog = {
      cause: error.name,
      message: error.message,
      details: error.details,
      stack: undefined
    };
    const errorResponse = {
      compositeFault: {
        faults: []
      }
    };

    log.info({ message: 'test' });

    if (process.env.SLACK_NOTIFICATION === 'yes') {
      await reportError(error);
    }

    if (!error.status || error.status > 499) {
      errorResponse.compositeFault.faults.push({
        explanationText: error.message,
        faultCode: error.name
      });

    } else {
      errorResponse.compositeFault.faults.push({
        explanationText: error.message,
        faultCode: error.name,
        paramValues: error.details
      });
    }

    if (error.severity && error.severity === 'error') {
      baseLog.stack = error.stack;
    }

    logger(baseLog);

    handler.response = {
      statusCode: statusCode,
      body: JSON.stringify({ ...errorResponse })
    };

    return next();
  }
};
