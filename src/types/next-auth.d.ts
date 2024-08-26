import type { User as UserType } from "@prisma/client";

import { type DefaultSession } from 'next-auth'

declare module "next-auth" {
  interface Session {
    user: UserType & DefaultSession["user"]
  }
  type User = UserType
}