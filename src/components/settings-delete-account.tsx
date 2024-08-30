"use client";

import React from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteAccount } from "@/actions/settings";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function SettingsDeleteAccount() {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDeleteMyAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteAccount();
      toast.success("Your account has been deleted.");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <div className=" rounded-[12px] border border-red-500/50 bg-zinc-900/60">
      <div className="p-4">
        <h4 className="mb-6 text-2xl font-semibold">Delete my account</h4>
        <p className="mb-4 text-sm">
          This action will permanently remove all your posts, data, and personal
          information associated with your account. This action is irreversible
          and cannot be undone.
        </p>
      </div>
      <div className="border-t border-red-500/50 bg-red-900/30 px-4 py-2">
        <AlertDialog open={open}>
          <AlertDialogTrigger asChild>
            <Button
            type="button"

              variant="destructive"
              className="ml-auto  rounded-[6px] bg-red-800 hover:bg-red-600"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent asChild className=" border-zinc-950 rounded-[6px]">
            <form onSubmit={handleDeleteMyAccount}>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our database.
                  <div className="my-8 flex flex-col gap-2">
                    <Label >
                      Type{" "}
                      <span className="text-secondary-foreground font-bold">
                        delete my account
                      </span>{" "}
                      to continue:
                    </Label>
                    <Input
                    className=" rounded-[6px] border-zinc-900 py-3"
                      type="text"
                      id="confirm"
                      onChange={(e) => setValue(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </AlertDialogDescription>
              <div className="flex justify-between">
                <AlertDialogCancel
                className=" bg-zinc-900 rounded-[6px] border-zinc-800"
                  onClick={() => {
                    setOpen(false);
                    setValue("");
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="  bg-red-800 rounded-[6px] hover:bg-red-700"
                  type="submit"
                  disabled={value !== "delete my account"}
                >
                  Delete
                </AlertDialogAction>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
