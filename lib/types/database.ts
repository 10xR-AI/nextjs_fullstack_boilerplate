import type { ObjectId } from "mongodb"

// User Types
export interface User {
  _id: ObjectId
  email: string
  name: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}
