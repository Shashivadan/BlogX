"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { createId } from "@paralleldrive/cuid2";

import { likePost, unlikePost } from "@/actions/post";
import type { Like, User } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "./ui/button";

type LikeButtonPropsTypes = {
  likes: Like[];
  user: User;
  postId: string;
};

export default function LikeButton({
  likes,
  user,
  postId,
}: LikeButtonPropsTypes) {
  const [optimisticLikes, updateOptimisticLike] = React.useOptimistic<
    Like[],
    "CREATE" | "DELETE"
  >(likes, (state, action) => {
    if (action === "DELETE") {
      return state.filter(
        (like) => like.userId !== user?.id && like.userId !== postId
      );
    }
    return [
      ...state,
      {
        id: createId(),
        userId: user ? user.id : createId(),
        postId,
      },
    ];
  });

  const isUserLiked = optimisticLikes.some((like) => like.userId === user?.id);

  const handleLike = async () => {
    try {
      if (isUserLiked) {
        updateOptimisticLike("CREATE");
        await likePost(postId);
      } else if (isUserLiked) updateOptimisticLike("DELETE");
      await unlikePost(postId);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <div>
      <Button
        type="button"
        className={cn("flex items-center gap-2", !user && "cursor-not-allowed")}
        disabled={!user}
        onClick={handleLike}
      >
        <Heart
          size={20}
          className={cn(isUserLiked && "fill-red-500 text-red-500")}
        />
        {optimisticLikes.length}
      </Button>
    </div>
  );
}
