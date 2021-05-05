import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

export const wrap = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};

