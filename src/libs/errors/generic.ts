import { v4 as uuid } from 'uuid';

export class GenericError extends Error {
  public name = 'API_Connection_Error';
  public message = 'Unable to properly communicate with API';
  public id: string;
  public status: number;
  public severity: string;
  public details: any;

  constructor(obj: any) {
    super();

    this.id = uuid();
    this.name = obj.name ?? this.name;
    this.status = obj.status ?? this.status;
    this.details = obj.details ?? {};
    this.severity = obj.severity ?? 'error';

    Error.captureStackTrace(this, GenericError);
  }
}
