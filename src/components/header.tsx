import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/get-current-user";
import Menu from "./menu";
import NewPostButton from "./new-post-button";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className=" fixed  inset-x-0 top-0 z-50 bg-black/50  shadow-sm  saturate-200  backdrop-blur-[4px] ">
      <div className="mx-auto max-w-4xl px-6 py-1 h-[60px] flex items-center justify-between">
        <Link href={"/"} className=" font-bold font-press text-sm">
          BlogX
        </Link>
        <div className=" flex items-center gap-3">
          {user && <><NewPostButton/></>}
          <Menu user={user} />
        </div>
      </div>
    </header>
  );
}
