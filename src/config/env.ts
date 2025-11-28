import 'dotenv/config';
import * as env from 'env-var';

export const serverConfig = {
  port: env.get('PORT_EMAIL_SERVICE').default('3005').asPortNumber(),
};

export const forumServer = {
  url: env.get('URL_FORUM_SERVER').required().asString(),
  port: env.get('PORT_FORUM_SERVER').default('3000').asPortNumber(),
};

export const resendConfig = {
  token: env.get('RESEND_API_KEY').required().asString(),
  emailFrom: env.get('EMAIL_FROM').required().asString(),
  templateResetPassword: env
    .get('TEMPLATE_RESET_PASSWORD')
    .required()
    .asString(),
};

export const emailConfig = {
  domain: env.get('EMAIL_DOMAIN').required().asString(),
  sender: env.get('EMAIL_SENDER').required().asEmailString(),
  port: env.get('EMAIL_PORT').required().asPortNumber(),
};
