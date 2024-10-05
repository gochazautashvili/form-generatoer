import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { delete_form } from "./actions";

const FormDeleteDialog = () => {
  const [isPending, startDelete] = useTransition();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isPending) return;

    setOpen(false);
  };

  const handleDelete = () => {
    startDelete(() => {
      delete_form().then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          toast({ description: res.message });
          setOpen(false);
        }
      });
    });
  };

  return (
    <Dialog open={open || isPending} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} variant="destructive" className="w-full">
          <Trash2 className="size-4 mr-3" /> Delete Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This form will delete</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-3 mt-2">
          <Button disabled={isPending} onClick={handleClose} variant="outline">
            Close
          </Button>
          <Button
            disabled={isPending}
            onClick={handleDelete}
            variant="destructive"
          >
            {isPending && <Loader2 className="animate-spin size-4 mr-3" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDeleteDialog;
