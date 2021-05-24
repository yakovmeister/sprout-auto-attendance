import joi from 'joi';
import ValidationError from '@libs/errors/validation';

export type RequestValidationParam = {
  date?: number;
}

const schema = joi.object({
  date: joi.number().required()
});

export const validation = async (data: RequestValidationParam) => {
  try {
    const validated = await schema.validateAsync(data);

    return validated;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const middleware = {
  before: async (handler) => {
    handler.event.queryStringParameters = await validation(handler.event.body ?? {});

    return;
  }
};
