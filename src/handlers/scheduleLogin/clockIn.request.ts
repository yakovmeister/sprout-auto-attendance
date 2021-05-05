import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '@libs/errors/api';
import qs from 'querystring';
import { logger } from '@libs/logger';

const clockIn = async (options: AxiosRequestConfig = {}): Promise<AxiosResponse['data']>  => {
  try {
    const url = process.env.SPROUT_CLOCK_URL;
    options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      ...options
    };

    const requestBody = qs.stringify({
      typeClock: 'ClockIn',
      Username: process.env.SPROUT_CLOCK_USERNAME,
      Password: process.env.SPROUT_CLOCK_PASSWORD
    });

    logger.info({
      clockInUrl: url
    });

    const response = await axios.post(
      url,
      requestBody,
      options
    );

    return response.data;
  } catch (error) {
    throw new ApiError(error);
  }
};

export { clockIn };
