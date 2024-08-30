"use client";

import PostCard, { type PostCardProps } from "@/components/post-card";
import { type User } from "next-auth";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

type ContentProps = {
  posts: Array<PostCardProps["post"]>;
  user: User;
};
export default function PostContent({ posts, user }: ContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "drafts";
  const [activeTab, setActiveTab] = React.useState(tab);

  const drafts = posts.filter((post) => !post.published);
  const published = posts.filter((post) => post.published);
  const handleChange = (value: string) => {
    setActiveTab(value);
    router.push(`/me/posts?tab=${value}`);
  };
  return (
    <div>
      <Tabs
        defaultValue="drafts"
        value={activeTab}
        onValueChange={handleChange}
      >
        <TabsList className="bg-zinc-900 rounded-[6px] active:text-white text-zinc-600 ">
          <TabsTrigger value="drafts" className=" rounded-[6px] ">
            Drafts {drafts.length > 0 && <>({drafts.length})</>}
          </TabsTrigger>
          <TabsTrigger value="published" className=" rounded-[6px] ">
            Published {published.length > 0 && <>({published.length})</>}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="drafts">
          {drafts.length === 0 && (
            <div className="py-8 text-center">
              You don&apos;t have any drafts yet.
            </div>
          )}
          {drafts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              showAuthor={false}
            />
          ))}
        </TabsContent>
        <TabsContent value="published">
          {published.length === 0 && (
            <div className="py-8 text-center">
              You haven&apos;t published any posts yet.
            </div>
          )}
          {published.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              showAuthor={false}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
