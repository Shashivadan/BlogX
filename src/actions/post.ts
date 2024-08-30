"use server";

// import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/get-current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { Visibility } from "prisma/prisma-client";

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
  } catch (error) {
    handleError();
  }
};

export const publichPost = async (
  id: string,
  title: string,
  content: string | null,
  description: string | null,
  published: boolean
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await prisma.post.update({ where : {
      id ,
      authorId : user.id,
    },
  data : {
    title ,
    content ,
    description ,
    updatedAt : new Date(),
    published
  }})
  } catch (error) {
    handleError();
  }
};


export const saveVisibility = async (id: string, visibility: Visibility) => {
  const user = await getCurrentUser()
  if(!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await prisma.post.update({
      where : {
        id ,
        authorId : user.id
      },
      data : {
        visibility
      }
    })

    revalidatePath(`/posts/${id}`);
  } catch (error) {
    handleError()
  }

};
