"use client"

import React, { useTransition } from "react";
import { PenTool, Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createNewPost } from "@/actions/post";
import { useRouter } from "next/navigation";

export default function NewPostButton() {
  const [isPending, startTransiton] = useTransition();
  const router = useRouter()



  const newPost = () => {
    startTransiton(async () => {
      try {
        const postId = await createNewPost("Untitled post");
        router.refresh()
        router.push(`/editor/${postId}`)
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return (
    <Button
      onClick={newPost}
      disabled={isPending}
      variant="ghost"
      className="py-1.5 flex items-center gap-1 rounded-[6px] border-solid border-zinc-900 hover:border-[1px] hover:bg-zinc-950 h-10"
    >
      {isPending ? (
        <>
          <Loader2Icon size={16} className="mr-2 animate-spin" />
        </>
      ) : (
        <>
          {" "}
          <PenTool size={16} className="mr-2" />
        </>
      )}{" "}
      publish
    </Button>
  );
}
