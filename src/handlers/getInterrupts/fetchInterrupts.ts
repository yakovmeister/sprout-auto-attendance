import { query } from '@libs/database/helpersv2';

const fetchInterrupts = () => {
  const parameters = {
    TableName: 'nananaTable',
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type'
    },
    ExpressionAttributeValues: {
      ':type': 'interrupt'
    },
    ScanIndexForward: false
  };

  return query(parameters);
};

export default fetchInterrupts;
