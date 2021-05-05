import * as winston from 'winston';

const transports = [];

transports.push(
  new winston.transports.Console()
);

if (process.env.STAGE === 'test') {
  transports.push(new winston.transports.File({ filename: 'combined.log' }));
}

const logger = winston.createLogger({
  transports
});

export { logger };
