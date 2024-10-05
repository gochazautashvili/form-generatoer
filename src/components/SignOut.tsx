"use client";
import { org_sign_out } from "@/app/auth/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const SignOut = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSignOut = () => {
    startTransition(() => {
      org_sign_out().then((res) => {
        if (res.success) {
          router.push("/auth/sign-in");
        }
      });
    });
  };

  return (
    <Button disabled={isPending} onClick={handleSignOut}>
      {isPending && <Loader2 className="animate-spin size-4 mr-3" />}
      Sign out
    </Button>
  );
};

export default SignOut;
