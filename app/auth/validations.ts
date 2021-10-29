import { User } from "db"
import { z } from "zod"

const password = z.string().min(10).max(100)

export const Signup = z.object({
  email: z.string().email(),
  password,
  name: z.string(),
  surname: z.string(),
  phone: z.string().optional(),
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
