import { config } from 'dotenv'

import { z } from 'zod'

if(process.env.NODE_ENV === 'test') {
    config({ path: '.env.test', override: true })
} else {
    config()
}

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    DATABASE_CLIENT: z.enum(['pg', 'sqlite']),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('Invalid environment variables!', _env.error.format())
    throw new Error('Invalid environment variables')
}

export const env = _env.data