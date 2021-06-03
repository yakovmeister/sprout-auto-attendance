import { CustomAuthorizerResult } from 'aws-lambda';

type Context = {
  email?: string;
  name?: string;
  picture?: string;
  token?: string;
};

const allowPolicy = (principalId: string, context: Context = {}): CustomAuthorizerResult => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "*",
          Effect: "Allow",
          Resource: "*"
        }
      ]
    },
    context
  };
}

export default allowPolicy;
