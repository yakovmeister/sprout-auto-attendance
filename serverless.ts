import type { AWS } from '@serverless/typescript';
import resources from './config/resources';
import handlers from '@handlers/index';

const serverlessConfiguration: AWS = {
  service: 'sprout-auto-attendance',
  frameworkVersion: '2',
  variablesResolutionMode: '20210219',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-dotenv-plugin',
    'serverless-webpack',
    'serverless-dynamodb-local',
    'serverless-offline'
  ],
  provider: {
    region: 'ap-southeast-1',
    name: 'aws',
    runtime: 'nodejs14.x',
    logRetentionInDays: 7,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
        'attendancebot'
      ]
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { ...handlers },
  resources: { ...resources }
};

module.exports = serverlessConfiguration;
