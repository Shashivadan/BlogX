import UserAvatar from "@/components/user-avatar";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { notFound } from "next/navigation";
import React from "react";
import PostCard from "@/components/post-card";
import { FileIcon } from "lucide-react";

type UserPageProps = {
  params: {
    id: string;
  };
};

export default async function page({ params }: UserPageProps) {
  const { id } = params;
  const currentUser = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      image: true,
      bio: true,
      Post: {
        where: {
          published: true,
          visibility: "PUBLIC",
        },
        select: {
          id: true,
          title: true,
          description: true,
          published: true,
          visibility: true,
          createdAt: true,
          likes: {
            select: {
              id: true,
            },
          },
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const { name, image, bio, Post } = user;

  return (
    <div>
      <div className=" flex items-center gap-4">
        <div className="relative size-14 md:size-20">
          <UserAvatar fill={true} src={image} alt={name} userId={id} />
        </div>
        <div className="text-xl font-semibold lg:text-3xl">{name}</div>
      </div>
      {bio && <p className="mt-4 text-muted-foreground">{bio}</p>}
      <Separator className="my-4" />
      {Post.length > 0 ? (
        <div className="mt-4">
          {Post.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              showAuthor={false}
              user={currentUser}
            />
          ))}
        </div>
      ) : (
        <div className="my-24 flex flex-col items-center justify-center gap-3">
          <div className="bg-muted flex size-24 items-center justify-center rounded-full">
            <FileIcon size={56} />
          </div>
          <div className="text-2xl font-semibold">No posts yet</div>
        </div>
      )}
    </div>
  );
}
