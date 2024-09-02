import { prisma } from "@/lib/db";

import PostCard from "@/components/post-card";
import { getCurrentUser } from "@/lib/get-current-user";
export default async function Home() {
  const user = await getCurrentUser()

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      visibility: 'PUBLIC'
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      published: true,
      author: {
        select: {
          name: true,
          image: true,
          id: true
        }
      },
      likes: {
        select: {
          id: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (posts.length === 0) {
    return <div className="text-center">No posts yet.</div>;
  }

  return (
    <main className="">
      {posts.map((post) => (
        <>
          <PostCard key={post.id} post={post} user={user} />
        </>
      ))}
    </main>
  );

}
