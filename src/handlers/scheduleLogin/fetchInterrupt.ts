import { query } from '@libs/database/helpersv2';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const fetchInterrupt = async () => {
  const currentDate = +dayjs().tz('Asia/Manila').format('YYYYMMDD');

  console.log(currentDate);

  const parameters = {
    TableName: 'nananaTable',
    KeyConditionExpression: '#type = :type AND #date = :date',
    ExpressionAttributeNames: {
      '#type': 'type',
      '#date': 'date'
    },
    ExpressionAttributeValues: {
      ':type': 'interrupt',
      ':date': currentDate
    },
    ScanIndexForward: false,
    Limit: 1
  };

  const result = await query(parameters);

  return result[0] ?? {};
};

export default fetchInterrupt;
