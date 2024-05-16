import 'dotenv/config'
import * as env from 'env-var';

export const getEnvs = () => {

    return {
        MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
        MAILER_MAIL: env.get('MAILER_MAIL').required().asString(),
        PORT: env.get('PORT').required().asIntPositive(),
    }

}