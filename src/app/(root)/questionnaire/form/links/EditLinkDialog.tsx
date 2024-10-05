import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { link_schema, TLink_schema } from "./validations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { edit_link } from "./actions";
import { toast } from "@/hooks/use-toast";
import { Link } from "@prisma/client";

interface Props {
  link: Link;
}

const EditLinkDialog = ({ link }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<TLink_schema>({
    resolver: zodResolver(link_schema),
    defaultValues: {
      code: link.code,
      name: link.name,
      location: link.location,
    },
  });

  const onSubmit = (values: TLink_schema) => {
    if (isPending) return;

    startTransition(() => {
      edit_link(values, link.id, link.formId).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          handleClose();
        }
      });
    });
  };

  const onOpenChange = (opened: boolean) => {
    if (!opened && !isPending) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (isPending) return;

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 hover:bg-blue-600">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link?</DialogTitle>
          <DialogDescription>
            Edit link to make your system easier.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="546275" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your code if you have multiple branch you can give
                    them specific code for now exactly where is a problem
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Gvirila-246..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your specific for your branches
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Tbilisi..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your branch location for know where is the problem
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending && <Loader2 className="animate-spin mr-3 size-4" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLinkDialog;
