"use server";

import { getCurrentUser } from "@/lib/get-current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { Visibility } from "@prisma/client";

const NOT_LOGGED_IN_ERROR = "Not logged in";
const handleError = () => {
  throw new Error("Something Went Worng");
};

export const createNewPost = async (title: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);
  try {
    const { id } = await prisma.post.create({
      data: {
        title,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/me/posts");
    return id;
  } catch (error) {
    handleError();
  }
};

export const savePost = async (
  id: string,
  title: string,
  content: string | null,
  description: string | null,
  published: boolean
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await prisma.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        title,
        content,
        description,
        published,
        updatedAt: new Date(),
      },
    });
     revalidatePath(`/posts/${id}`);
  } catch (error) {
    handleError();
  }
};



export const saveVisibility = async (id: string, visibility: Visibility) => {
  const user = await getCurrentUser();
  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);
  try {
    await prisma.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        visibility,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch (error) {
    handleError();
  }
};


export const deletePost = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);
  try {
    await prisma.post.delete({
      where: {
        id,
        authorId: user.id,
      },
    });

    revalidatePath("/me/posts");
  } catch {
    handleError();
  }
};


export const likePost = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Please log in to like this post.");

  try {
    await prisma.like.create({
      data: {
        postId: id,
        userId: user.id,
      },
    });
     revalidatePath(`/posts/${id}`);
  } catch (error) {
     revalidatePath(`/posts/${id}`);
    handleError();
  }
};

export const unlikePost = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Please log in to unlike this post.");
  try {
    const result = await prisma.like.deleteMany({
      where: {
        postId: id,
        userId: user.id,
      },
    });
    if (result.count === 0) throw new Error("You have not liked this post.");
    revalidatePath(`/posts/${id}`);
  } catch (error) {
    revalidatePath(`/posts/${id}`);
    handleError();
  }
};
