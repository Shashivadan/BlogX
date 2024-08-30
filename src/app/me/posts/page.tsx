import React from 'react'
import type { Metadata } from "next";
import { getCurrentUser } from '@/lib/get-current-user';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import PageHeader from '@/components/page-headers';
import PostContent from '@/components/post-content';


export const metadata: Metadata = {
  title: "Your posts",
};
export default async function page() {
  const user = await getCurrentUser()
  if(!user){
    redirect("/login?redirect=/me/posts");
  }

  const posts = await prisma.post.findMany({
    where : {
      authorId : user.id
    },
    select : {
      id : true,
      title : true ,
      description : true ,
      content : true ,
      published : true ,
      createdAt : true ,
      likes : {
        select : {
          id : true
        }
      },
      author : {
        select : {
          id : true ,
          name : true ,
          image : true
        }
      }
    },
    orderBy : {
      createdAt : "desc"
    }
  })
  return (
    <div>
      <PageHeader title="Your posts" className="mb-8" />
      <PostContent posts={posts} user={user} />
    </div>
  );
}
