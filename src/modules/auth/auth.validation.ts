import { z } from "zod"

// Registration Check
export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

// Login Check
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>