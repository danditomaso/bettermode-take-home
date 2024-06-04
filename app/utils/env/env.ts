import { z } from 'zod'

const schema = z.object({
  VITE_API_ENDPOINT: z.string(),
})


export function initEnvs() {
  const parsed = schema.safeParse(import.meta.env)

  if (parsed.success === false) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables.')
  }
}

