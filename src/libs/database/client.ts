import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, TranslateConfig } from '@aws-sdk/lib-dynamodb';
import { marshallOptions, unmarshallOptions } from '@aws-sdk/util-dynamodb';

let dynamodbClient: DynamoDB;
let documentClient: DynamoDBDocument;

function client(config: DynamoDBClientConfig): DynamoDBDocument {
  const marshallOptions: marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false
  };
  
  const unmarshallOptions: unmarshallOptions = {
    wrapNumbers: false
  };
  
  const translateConfig: TranslateConfig = {
    marshallOptions,
    unmarshallOptions
  }

  if (!documentClient) {
    dynamodbClient = new DynamoDB(config);
    documentClient = DynamoDBDocument.from(dynamodbClient, translateConfig);
  }

  return documentClient;
}

export default client;
