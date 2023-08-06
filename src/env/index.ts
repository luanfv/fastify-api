import { config } from 'dotenv'
import { z } from 'zod'

process.env.NODE_ENV === 'test' ? config({ path: '.env.test' }) : config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const ERROR_MESSAGE = 'Invalid environment variables!'

  throw new Error(ERROR_MESSAGE)
}

export const env = _env.data
