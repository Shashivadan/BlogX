"use client";

import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/schemas/setting-from-schema";
import type { User } from "@prisma/client";
import { toast } from "sonner";
import { saveSettings } from "@/actions/settings";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserIcon, Loader2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
export type Values = {
  image: string;
  name: string;
  bio?: string | undefined;
};

type FormProps = {
  user: User;
};

export default function SettingsForm({ user }: FormProps) {
  const { image, bio, name } = user;
  // const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      image: image as string,
      name: name as string,
      bio: (bio as string) || undefined,
    },
  });

  const onSubmit = async (values: Values) => {
    setSaving(true);
    try {
      await saveSettings(values);
      toast.success("Settings saved.");
      setSaving(false);
    } catch (error) {
      toast.error((error as Error).message);
      setSaving(false);
    }
  };

  return (
    <>
      <form
        className="space-y-4 rounded-[9px] border border-zinc-900 bg-zinc-900/60 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-6 text-2xl font-semibold">Account</h4>
        <Avatar className="size-24">
          <AvatarImage
            className=" rounded-full"
            src={image as string}
            width={96}
            height={96}
            alt={name as string}
          />
          <AvatarFallback>
            <UserIcon size={40} />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Image</Label>
          <Input
            className=" rounded-[6px] border-zinc-900 bg-zinc-950 py-5"
            type="url"
            id="image"
            placeholder="Image"
            {...register("image")}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            className=" rounded-[6px] border-zinc-900 bg-zinc-950 py-5"
            type="text"
            id="name"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            className=" rounded-[6px] border-zinc-900 bg-zinc-950 py-5"
            type="text"
            id="bio"
            placeholder="Bio"
            {...register("bio")}
          />
          {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={saving}
          className="ml-auto hover:bg-zinc-900  bg-zinc-800 border-solid border-zinc-900 border-[1px] rounded-[6px] "
        >
          {saving && <Loader2Icon size={16} className="mr-2 animate-spin" />}
          Save
        </Button>
      </form>
    </>
  );
}
