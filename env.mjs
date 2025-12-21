import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    // Database
    MONGODB_URI: z.string().url().optional(),
    // Redis (for job queues)
    REDIS_URL: z.string().url().optional(),
    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    BETTER_AUTH_URL: z.string().url().optional(),
    // Google OAuth
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    // Email (Resend)
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().email().optional(),
    // Uploadthing (file uploads)
    UPLOADTHING_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    MONGODB_URI: process.env.MONGODB_URI,
    REDIS_URL: process.env.REDIS_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
