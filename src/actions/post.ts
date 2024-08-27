"use server";

// import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/get-current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

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
