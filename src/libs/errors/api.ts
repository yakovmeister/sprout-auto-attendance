import { v4 as uuid } from 'uuid';
import { AxiosError } from 'axios';

export default class ApiError extends Error {
  public name = 'API_Connection_Error';
  public message = 'Unable to properly communicate with API';
  public id: string;
  public status: number;
  public severity: string;
  public details: any;

  constructor(error: AxiosError) {
    super();

    this.id = uuid();
    this.status = error.response.status;
    this.details = {
      response: error.response.data
    };
    this.severity = error.response.status >= 500 ? 'error' : 'warn';
    this.stack = error.stack;

    Error.captureStackTrace(this, ApiError);
  }
}
