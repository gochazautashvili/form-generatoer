"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import {
  organization_schema_sign_up,
  organization_schema_sign_up_type,
} from "../validations";
import { org_sing_up } from "../actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<organization_schema_sign_up_type>({
    resolver: zodResolver(organization_schema_sign_up),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = (data: organization_schema_sign_up_type) => {
    startTransition(() => {
      org_sing_up(data).then((res) => {
        if (res?.error) {
          toast({
            variant: "destructive",
            description: res?.error,
          });
        }

        if (res.success) router.push("/");
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[600px] space-y-4"
      >
        <h1 className="text-2xl font-bold">Create Organization</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Type Organization Name..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Type Organization Email..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Type Organization Password..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending && <Loader2 className="mr-3 animate-spin size-4" />}
          Submit
        </Button>
        <Link className="text-sm underline font-semibold" href="/auth/sign-in">
          You already have an account?
        </Link>
      </form>
    </Form>
  );
};

export default SignUpForm;
