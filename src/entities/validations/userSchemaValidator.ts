import { z } from 'zod'
export const UserSchemaValidator = z.object({
  id: z.string().uuid().max(100),
  name: z.string().min(4).max(60),
  email: z.string().email().max(60),
  password: z.string().min(6).max(100)
})
