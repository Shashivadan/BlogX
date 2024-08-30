"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";

import { type Values } from "@/components/setting-form";

export const saveSettings = async (values: Values) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Not logged in");

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    throw new Error("Something went worng.. Please try again");
  }
};

export const deleteAccount = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  try {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    throw new Error("Something went worng.. Please try again");
  }
};
