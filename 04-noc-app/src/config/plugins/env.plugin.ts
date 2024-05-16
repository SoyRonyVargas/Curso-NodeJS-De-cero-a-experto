import 'dotenv/config'
import * as env from 'env-var';

export const getEnvs = () => {

    return {
        MAILER_PASSWORD: env.get('MAILER_PASSWORD').required().asString,
        MAILER_MAIL: env.get('MAILER_MAIL').required().asString,
        PORT: env.get('PORT').required().asIntPositive(),
    }

}