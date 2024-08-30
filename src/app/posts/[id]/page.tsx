import Link from "next/link";
import { notFound } from "next/navigation";

import Controls from "@/components/controls";
import MDX from "@/components/mdx";
import UserAvatar from "@/components/user-avatar";
import { getCurrentUser } from "@/lib/get-current-user";
import { formatPostDate } from "@/utils/format-post-date";
import { getMdxSource } from "@/utils/get-mdx-source";
import { prisma } from "@/lib/db";
import BackButton from "@/components/back-button";
import LikeButton from "@/components/like-button";

type PostPageProps = {
  params: {
    id: string;
  };
};

export default async function page({ params }: PostPageProps) {
  const { id } = params;
  const user = await getCurrentUser();
  const post = await prisma.post.findUnique({
    where: {
      id,
      published: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
          postId: true,
        },
      },
    },
  });

   if (!post) {
     notFound();
   }

     const { title, description, content, createdAt, author, likes } = post;

     const source = await  getMdxSource(content)


  return (
    <div>
      <div className="flex items-center justify-between">
        <BackButton />
        <Controls id={id} user={user} authorId={author.id} postTitle={title} />
      </div>
      <div className="my-8">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <Link href={`/users/${author.id}`} className="flex items-center gap-3">
        <UserAvatar
          width={40}
          height={40}
          src={author.image}
          alt={author.name}
          userId={author.id}
        />
        <div className="text-sm">
          <div>{author.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatPostDate(createdAt)}
          </div>
        </div>
      </Link>
      <MDX source={source} />
      <LikeButton likes={likes} user={user!} postId={id} />
    </div>
  );
}
