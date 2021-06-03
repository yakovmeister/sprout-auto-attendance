import { v4 as uuid } from 'uuid';

export default class DatabaseError extends Error {
  public name = 'DynamoDB_Error';
  public message = 'Unable to communicate with database';
  public id: string;
  public status: number;
  public severity: string;
  public details: any;

  constructor(error: Error) {
    super();

    this.id = uuid();
    this.status = 500;
    this.details = {};
    this.severity = 'error';
    this.stack = error.stack;

    Error.captureStackTrace(this, DatabaseError);
  }
}
