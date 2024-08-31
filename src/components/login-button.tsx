"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2Icon } from "lucide-react";

export default function LoginButton() {
  const [loading, setLoading] = React.useState(false);
  const path = useSearchParams()?.get("redirect") || "/";
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setLoading(true);
          try {
            void signIn("google", { callbackUrl: "/", redirect: false }).then(
              () => setLoading(false)
            );
          } catch (error) {
            console.log(error);
          }
        }}
        className="hover:bg-zinc-800/50 rounded-[6px] border-solid border-[1px] border-zinc-800 text-sm md:h-10 flex gap-2 mx-auto mt-8 "
      >
        {loading ? (
          <>
            {" "}
            <Loader2Icon size={16} className="animate-spin" />
          </>
        ) : (
          <Image src="/images/google.svg" alt="google" width={20} height={20} />
        )}
        <div>continue with google</div>
      </Button>
    </div>
  );
}
