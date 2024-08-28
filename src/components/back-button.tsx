// 'use client'

import React from "react";
import { Button } from "./ui/button";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
type BackProps = React.ComponentPropsWithoutRef<"button">;
export default function BackButton(props: BackProps) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className=" hover:bg-zinc-900 rounded-[6px] "
      {...props}
    >
      <ArrowLeftIcon
        size={20}
        className="mr-2 transition-transform duration-300 group-hover:-translate-x-2"
      />
      Back
    </Button>
  );
}
