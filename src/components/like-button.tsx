"use client";

import { createId } from "@paralleldrive/cuid2";
import { type Like } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { type User } from "next-auth";
import * as React from "react";
import { toast } from "sonner";

import { likePost, unlikePost } from "@/actions/post";

type LikeButtonProps = {
  likes: Like[];
  user: User | undefined;
  postId: string;
};

const LikeButton = (props: LikeButtonProps) => {
  const { likes, user, postId } = props;
  const [optimisticLikes, updateOptimisticLike] =
    React.useOptimistic<Like[], "CREATE" | "DELETE">(
      likes,
      (state, action) => {
        if (action === "DELETE") {
          return state.filter(
            (like) => like.userId !== user?.id && like.postId !== postId
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
      }
    );

  const isUserLiked = optimisticLikes.some((like) => like.userId === user?.id);

  const handleLike = async () => {
    try {
      if (!isUserLiked) {
        updateOptimisticLike("CREATE");
        await likePost(postId);
      } else if (isUserLiked) {
        updateOptimisticLike("DELETE");
        await unlikePost(postId);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
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
  );
};

export default LikeButton;
