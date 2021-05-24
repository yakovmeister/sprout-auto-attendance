import { del } from '@libs/database/helpersv2';

const deleteInterrupt = (date: number) => {
  const parameters = {
    TableName: 'nananaTable',
    Key: {
      type: 'interrupt',
      date: date
    }
  };

  return del(parameters);
};

export default deleteInterrupt;
