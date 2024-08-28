import BlogPostForm from "@/components/blog-post-form";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect, notFound } from "next/navigation";

type EditorPageProps = {
  params: {
    id: string;
  };
};
export default async function page({ params }: EditorPageProps) {
  const { id } = params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?redirect=/editor/${id}`);
  }

  const post = await prisma.post.findUnique({
    where: {
      authorId: user.id,
      id,
    },
  });

  if (!post) {
    notFound();
  }
  return <BlogPostForm post={post} />;
}
