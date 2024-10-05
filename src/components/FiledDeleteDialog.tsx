import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { delete_filed } from "@/actions";
import { GeneratedFormType } from "@/types";
import { toast } from "@/hooks/use-toast";

interface Props {
  jsonForm: string;
  formId: string;
  filedId: string;
  onDelete: () => void;
}

const FiledDeleteDialog = ({ jsonForm, formId, filedId, onDelete }: Props) => {
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
    const formData: GeneratedFormType = JSON.parse(jsonForm);

    if (!formData.formFields) return;

    const content = JSON.stringify({
      formTitle: formData.formTitle,
      formSubheading: formData.formSubheading,
      formFields: formData.formFields.filter((item) => item.id !== filedId),
    });

    startDelete(() => {
      delete_filed(content, formId).then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          toast({ description: res.message });
          setOpen(false);
          onDelete();
        }
      });
    });
  };

  return (
    <Dialog open={open || isPending} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} variant="destructive" className="w-full">
          <Trash2 className="size-4 mr-3" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This filed will delete</DialogDescription>
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

export default FiledDeleteDialog;
