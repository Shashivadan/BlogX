"use client";

import React from 'react'
import {
  MoreVerticalIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,

  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { type User } from "next-auth";
import { toast } from 'sonner';
import { copyUrl } from "@/utils/copy-url";
import { siteConfig } from "@/lib/site";

type ConstrolPropType = {
  id: string;
  user: User | null | undefined;
  authorId: string;
  postTitle: string;
};



import { deletePost } from "@/actions";
export default function Controls({id,  user , authorId , postTitle} : ConstrolPropType) {
    const [open, setOpen] = React.useState(false);

      const handleDelete = async () => {
        try {
          await deletePost(id);
          toast.success("Post deleted");
        } catch (error) {
          toast.error((error as Error).message);
        }
      };
  return (
    <div>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="px-2 hover:border-zinc-900 hover:bg-zinc-900 rounded-[6px]">
            <MoreVerticalIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=' rounded-[6px] border-zinc-900 bg-zinc-950 text-zinc-500 text-sm hover:text-zinc-200'>
          <DropdownMenuItem
            onClick={() => copyUrl(`${siteConfig.url}/posts/${id}`)}
          >
            <Share2Icon size={16} className="mr-2.5" />
            Share
          </DropdownMenuItem>
          {user && user.id === authorId && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${id}`}>
                  <PencilIcon size={16} className="mr-2.5" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash2Icon size={16} className="mr-2.5" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className=' rounded-[6px] border-none '>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            &quot;{postTitle}&quot; will be permanently deleted. This action
            cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-between">
            <AlertDialogCancel className=' bg-zinc-900 rounded-[6px] border-none hover:bg-zinc-800'>Cancel</AlertDialogCancel>
            <AlertDialogAction className=' bg-zinc-900 rounded-[6px] hover:bg-red-600 ' onClick={handleDelete}>Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
