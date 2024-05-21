import { z } from 'zod'

const schema = z.object({
  VITE_ACCESS_TOKEN: z.string(),
  VITE_SPACE_ID: z.string(),
})


export function initEnvs() {
  const parsed = schema.safeParse(import.meta.env)

  if (parsed.success === false) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables.')
  }
}

