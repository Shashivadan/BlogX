import LoginButton from "@/components/login-button";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return (
    <>
      <div >
        <div className=" w-full flex items-center justify-center flex-col p-4 gap-2">
          <div className="text-2xl font-semibold">Log in</div>
          <p className="text-muted-foreground">to continue to One Blog</p>
        </div>
          <LoginButton />
      </div>
    </>
  );
}
