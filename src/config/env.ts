import 'dotenv/config';
import * as env from 'env-var';

export const serverConfig = {
  port: env.get('PORT_EMAIL_SERVICE').default('3005').asPortNumber(),
};

export const resendConfig = {
  url: env.get('RESEND_API_URL').required().asUrlString(),
  token: env.get('RESEND_API_KEY').required().asString(),
};

export const emailConfig = {
  domain: env.get('EMAIL_DOMAIN').required().asString(),
  sender: env.get('EMAIL_SENDER').required().asEmailString(),
  password: env.get('EMAIL_PASSWORD').asString(),
};
