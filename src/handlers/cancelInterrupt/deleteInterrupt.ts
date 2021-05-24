import { del } from '@libs/database/helpers';

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
