import type { AWS } from '@serverless/typescript';
import resources from './config/resources';
import handlers from '@handlers/index';

const serverlessConfiguration: AWS = {
  service: 'sprout-auto-attendance',
  frameworkVersion: '2',
  variablesResolutionMode: '20210219',
  package: {
    individually: true
  },
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
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:*'
        ],
        Resource: [
          /**
           * bruh... srsly.
           * why u no work wit arn:aws:dynamodb:::table/nananaTable ?
           */
          'arn:aws:dynamodb:ap-southeast-1:*:table/nananaTable'
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          'events:*'
        ],
        Resource: [
          /**
           * bruh... srsly.
           * why u no work wit arn:aws:events:::rule/* ?
           */
          'arn:aws:events:ap-southeast-1:*:rule/*' 
        ]
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { ...handlers },
  resources: { ...resources }
};

module.exports = serverlessConfiguration;
