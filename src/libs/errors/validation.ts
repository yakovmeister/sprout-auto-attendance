import { v4 as uuid } from 'uuid';
import { ValidationError as JoiValidationError } from 'joi';

export default class ValidationError extends Error {
  public name = 'Validation_Error';
  public message = 'Invalid input found';
  public id: string;
  public status: number;
  public severity: string;
  public details: any;

  constructor(e: JoiValidationError) {
    super();

    this.id = uuid();
    this.status     = 400;
    this.severity   = 'warn';
    this.details    = e.details.map((details) => ({
      key: details.context.key,
      message: details.message,
      value: details.context.value
    }));

    Error.captureStackTrace(this, ValidationError);
  }
}
