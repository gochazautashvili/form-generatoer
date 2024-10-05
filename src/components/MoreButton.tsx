import { MoreHorizontal } from "lucide-react";
import FiledUpdateDialog from "./FiledUpdateDialog";
import FiledDeleteDialog from "./FiledDeleteDialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface Props {
  jsonForm: string;
  formId: string;
  filedId: string;
}

const MoreButton = ({ jsonForm, formId, filedId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MoreHorizontal className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-[150px]">
        <FiledUpdateDialog
          fieldId={filedId}
          jsonForm={jsonForm}
          onEdit={handleClose}
        />
        <FiledDeleteDialog
          filedId={filedId}
          formId={formId}
          jsonForm={jsonForm}
          onDelete={handleClose}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MoreButton;
