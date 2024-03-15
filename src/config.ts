import dotenv from 'dotenv'

dotenv.config()

export const config = {
  env: process.env.NODE_ENV || 'development',
  secretKeyOne: process.env.SECRET_KEY_ONE,
  secretKeyTwo: process.env.SECRET_KEY_ONE,
  clientUrl: process.env.CLIENT_URL,
  redisHost: process.env.REDIS_HOST
}
