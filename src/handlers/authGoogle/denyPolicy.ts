import { CustomAuthorizerResult } from 'aws-lambda';

const denyPolicy = (): CustomAuthorizerResult => {
  return {
    principalId: "deny",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "*",
          Effect: "Deny",
          Resource: "*"
        }
      ]
    }
  };
};

export default denyPolicy;
