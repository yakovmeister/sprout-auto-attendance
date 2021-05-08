import { del } from '@libs/database/helpers';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const deleteInterrupt = () => {
  const currentDate = +dayjs().tz('Asia/Manila').format('YYYYMMDD');

  const parameters = {
    TableName: 'nananaTable',
    Key: {
      type: 'interrupt',
      date: currentDate
    }
  };

  return del(parameters);
};

export default deleteInterrupt;
