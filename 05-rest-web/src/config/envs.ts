import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
    PORT: get('PORT').asPortNumber() ?? 0,
    PUBLIC_PATH: get('PUBLIC_PATH').asString(),
}