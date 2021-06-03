import { put } from '@libs/database/helpers';

const pushInterrupt = (date: number) => {
  const params = {
    TableName: 'nananaTable',
    Item: {
      type: 'interrupt',
      date
    }
  };

  return put(params);
};

export default pushInterrupt;
