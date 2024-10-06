import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { delete_link } from "./actions";
import { toast } from "@/hooks/use-toast";

interface Props {
  linkId: string;
}

const DeleteLinkDialog = ({ linkId }: Props) => {
  const [isDeleting, startDelete] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (isDeleting) return;

    startDelete(() => {
      delete_link(linkId).then((res) => {
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isDeleting) return;
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpen}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete?</DialogTitle>
          <DialogDescription>
            This form link and form submissions based on this link will be
            deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-700"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Close
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting && <Loader2 className="animate-spin size-4 mr-3" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLinkDialog;
