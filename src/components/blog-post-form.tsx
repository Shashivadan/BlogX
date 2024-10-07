"use client";

import React from "react";
import { type Post, Visibility } from "@prisma/client";
import BackButton from "./back-button";
import { Loader2Icon, SettingsIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import Editor from "./editor/index";
import { toast } from "sonner";
import { savePost, saveVisibility } from "@/actions/post";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/db";

type PropsType = {
  post: Post;
};

export default function BlogPostForm({ post }: PropsType) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(post.title);
  const [description, setDescription] = React.useState(post.description);
  const [content, setContent] = React.useState(post.content);
  const [saving, setSaving] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [visibility, setVisibility] = React.useState<Visibility>(
    post.visibility
  );
  const router = useRouter();
  const handleSave = async () => {
    if (!title) return toast.warning("Title cannot be empty");
    setSaving(true);
    try {
      await savePost(post.id, title, content, description, false);
      toast.success("Post saved");
      return setSaving(false);
    } catch (error) {
      setSaving(false);
      toast.error((error as Error).message);
    }
  };

  const handleSaveSettingsIcon = async () => {
    try {
      await saveVisibility(post.id, visibility);
      toast.success("Post saved");
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const handlePublish = async () => {
    if (!title) {
      return toast.warning("Title cannot be empty");
    }
    setPublishing(true);
    try {
      await savePost(post.id, title, content, description, true);
      toast.success("Post publisched");
      setPublishing(false);
    } catch (error) {
      setPublishing(true);
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-between">
        <BackButton />
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="px-2.5 border-solid rounded-[6px] border-zinc-900 hover:bg-zinc-900 hover:border-[1px]"
              type="button"
            >
              <SettingsIcon size={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=" border-zinc-900 rounded-[6px] ">
            <div className=" flex items-center justify-between">
              <div className="mb-1.5 text-sm font-medium leading-none">
                Visibility
              </div>
              <AlertDialogCancel className="border-none hover:bg-zinc-950 rounded-[6px]">
                {" "}
                <X size={16} />
              </AlertDialogCancel>
            </div>
            <Select
              value={visibility}
              onValueChange={(value) => setVisibility(value as Visibility)}
            >
              <SelectTrigger className=" md:w-1/2 rounded-[6px] hover:bg-zinc-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className=" rounded-[6px] border-zinc-900">
                <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
                <SelectItem value={Visibility.PRIVATE}>Private</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end">
              <Button
                type="button"
                className=" rounded-[6px] bg-zinc-900  "
                onClick={handleSaveSettingsIcon}
              >
                Save
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="my-8 space-y-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            className="mt-2 rounded-[6px] border-zinc-900 focus:border-zinc-900  focus-visible:ring-zinc-800 "
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5 ">
          <Label htmlFor="title">Description</Label>
          <Textarea
            className="rounded-[6px] border-zinc-900 mt-2 focus:border-zinc-90 resize-none focus:ring-zinc-900 focus-visible:ring-zinc-800"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            value={description ?? undefined}
          />
        </div>
        <div className="flex flex-col gap-1.5 ">
          <Editor
            options={{ content }}
            onChange={(editor) =>
              setContent(editor.storage.markdown.getMarkdown())
            }
          />


          <div
            className={cn(
              "flex",
              post.published ? "justify-end" : "justify-between",
              "mt-2"
            )}
          >
            {!post.published && (
              <>
                <Button
                  type="button"
                  className="rounded-[6px] bg-zinc-900 hover:bg-zinc-800 "
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving && (
                    <Loader2Icon size={16} className="mr-2 animate-spin" />
                  )}
                  Save as draft
                </Button>
              </>
            )}

            <Button
              type="button"
              className="rounded-[6px] bg-zinc-900 hover:bg-zinc-800"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing && (
                <Loader2Icon size={16} className="mr-2 animate-spin" />
              )}
              Publish
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
