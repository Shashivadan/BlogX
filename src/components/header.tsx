import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/get-current-user";
import Menu from "./menu";
export default async function Header() {
  const user = await getCurrentUser()
  // const user = {
  //   id: "1",
  //   name: "shashivadan99",
  //   email: "shashivadan99@gmail.com",
  //   emailVerified: null,
  //   image: "https://avatars.githubusercontent.com/u/42784299?v=4",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   bio: null,
  // };

  return (
    <header className=" fixed  inset-x-0 top-0 z-50 bg-black/50  shadow-sm  saturate-200  backdrop-blur-[4px] ">
      <div className="mx-auto max-w-4xl px-6 py-1 h-[60px] flex items-center justify-between">
        <Link href={"/"} className="text-lg font-bold">
          BlogX
        </Link>
        <div>
          <Menu user={user} />
        </div>
      </div>
    </header>
  );
}
