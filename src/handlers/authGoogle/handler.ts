import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { OAuth2Client } from 'google-auth-library';
import allowPolicy from '@handlers/authGoogle/allowPolicy';
import denyPolicy from '@handlers/authGoogle/denyPolicy';

const main = async (event: APIGatewayTokenAuthorizerEvent) => {
  const { ALLOWED_USER, GOOGLE_CLIENT_ID, WEB_CLIENT } = process.env;
  
  if (!WEB_CLIENT || ['no'].includes(WEB_CLIENT)) {
    return denyPolicy();
  }

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const token = event.authorizationToken;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });

    const { email, name, picture } = ticket.getPayload();
    
    if (email !== ALLOWED_USER) {
      return denyPolicy();
    }
    
    return allowPolicy(email, {
      email,
      name,
      picture,
      token
    });
  } catch (error) {
    return denyPolicy();
  }
};

export { main };
