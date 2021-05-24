import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommandInput,
  DeleteCommandOutput,
  DynamoDBDocument,
  PutCommandInput,
  PutCommandOutput,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommandInput,
  ScanCommandOutput
} from '@aws-sdk/lib-dynamodb';
import db from '@libs/database/client';
import DatabaseError from '@libs/errors/database';

let cache: DynamoDBDocument;

export const client = () => {
  try {
    if (!!cache) {
      return cache;
    }

    const options: DynamoDBClientConfig = {};

    if (process.env.LOCAL === '1') {
      options.region = 'localhost';
      options.endpoint = 'http://localhost:8000';
    } else {
      options.region = process.env.REGION;
    }

    cache = db(options);

    return cache;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

export const del = async (param: DeleteCommandInput): Promise<DeleteCommandOutput> => {
  const result = await cache.delete(param);

  return result;
}

export const scan = async (param: ScanCommandInput): Promise<ScanCommandOutput["Items"]> => {
  const result = await cache.scan(param);

  return result.Items;
}

export const query = async (param: QueryCommandInput): Promise<QueryCommandOutput["Items"]> => {
  const result = await cache.query(param);

  return result.Items;
}

export const put = async (param: PutCommandInput): Promise<PutCommandOutput> => {
  const result = await cache.put(param);

  return result;
}
