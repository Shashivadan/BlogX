"use client";
import { User } from "next-auth";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserIcon } from "lucide-react";

type MenuProp = {
  user: User | undefined;
};

export default function Menu({ user }: MenuProp) {
  const path = usePathname();

  if (!user) {
    return (
      <Button
        type="button"
        className=" bg-zinc-900 hover:bg-zinc-800/50 rounded-[6px] border-solid border-[1px] border-zinc-800 text-sm md:h-10 "
        asChild
      >
        <Link href={`/login?redirect=${path}`}>Log in</Link>
      </Button>
    );
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={user?.image as string}
              alt={user?.name as string}
            />
            <AvatarFallback>
              <UserIcon size={24} />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className=" bg-zinc-900 border-solid border-[1px] border-zinc-800 rounded-[6px] hover:bg-zinc-900"
          align="end"
        >
          <DropdownMenuItem className="flex flex-col items-start">
            <Link href={`/users/${user?.id}`}>
              <div className="text-sm">{user?.name}</div>
              <div className="text-sm  text-muted-foreground">
                {user?.email}
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem asChild>
            <Link href="/me/posts">Posts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/me/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem asChild><Link href={"https://github.com/Shashivadan/blogx/issues/new"}>Report a issue</Link></DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
