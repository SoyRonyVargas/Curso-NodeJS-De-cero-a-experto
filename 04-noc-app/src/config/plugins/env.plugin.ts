import 'dotenv/config'
import * as env from 'env-var';

export const envs = {
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    MAILER_MAIL: env.get('MAILER_MAIL').required().asString(),
    PORT: env.get('PORT').required().asIntPositive(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_URL: env.get('MONGO_URL').required().asUrlString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),
}