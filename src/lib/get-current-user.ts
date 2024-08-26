import { getServerSession } from "next-auth";

import { authOption } from "./auth";

export async function getCurrentUser() {
  const session =  await getServerSession(authOption);
  return  session?.user
}