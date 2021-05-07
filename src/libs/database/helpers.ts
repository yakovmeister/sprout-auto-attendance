import { DynamoDB } from 'aws-sdk';

export const del = async (
  param: DynamoDB.DocumentClient.DeleteItemInput
): Promise<DynamoDB.DocumentClient.DeleteItemOutput> => {
  const result = await dynamoDocClient().delete(param).promise();
  return result;
};

export const scan = async (
  param: DynamoDB.DocumentClient.ScanInput
): Promise<DynamoDB.DocumentClient.ItemList> => {
  const result = await dynamoDocClient().scan(param).promise();
  return result.Items;
};

export const query = async (
  param: DynamoDB.DocumentClient.QueryInput
): Promise<DynamoDB.DocumentClient.ItemList> => {
  const result = await dynamoDocClient().query(param).promise();
  return result.Items;
};

export const put = (
  param: DynamoDB.DocumentClient.PutItemInput
): Promise<any> => {
  return dynamoDocClient().put(param).promise();
};

export const describeTable = async (
  param: DynamoDB.DescribeTableInput
): Promise<DynamoDB.DescribeTableOutput> => {
  const result = await dynamoClient().describeTable(param).promise();
  return result;
};

let dynamoDocClientCache: DynamoDB.DocumentClient = null;
export const dynamoDocClient = (): DynamoDB.DocumentClient => {
  try {
    if (!!dynamoDocClientCache) {
      return dynamoDocClientCache;
    }
  
    const options: DynamoDB.Types.ClientConfiguration = {};
  
    if (process.env.LOCAL === '1') {
      options.region = 'localhost';
      options.endpoint = 'http://localhost:8000';
    } else {
      options.region = process.env.REGION;
    }
  
    dynamoDocClientCache = new DynamoDB.DocumentClient(options);
  
    return dynamoDocClientCache;
  } catch (error) {
    throw Error('Ddb error'); // update later with more info
  }
};

let dynamoClientCache: DynamoDB = null;
export const dynamoClient = (): DynamoDB => {
  try {
    if (!!dynamoClientCache) {
      return dynamoClientCache;
    }
  
    const options: DynamoDB.Types.ClientConfiguration = {};
  
    if (process.env.LOCAL === '1') {
      options.region = 'localhost';
      options.endpoint = 'http://localhost:8000';
    } else {
      options.region = process.env.REGION;
    }
  
    dynamoClientCache = new DynamoDB(options);
  
    return dynamoClientCache;
  } catch (error) {
    throw Error('DocumentClient error'); // update later with more info
  }
};
