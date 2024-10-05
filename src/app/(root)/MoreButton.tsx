"use client";
import ExportButton from "@/components/ExportButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import ResDeleteDialog from "./ResDeleteDialog";

interface Props {
  jsonData: string;
  resId: string;
}

const MoreButton = ({ jsonData, resId }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="absolute top-3 right-3">
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-[180px]">
        <ExportButton jsonData={jsonData} />
        <ResDeleteDialog resId={resId} />
      </PopoverContent>
    </Popover>
  );
};

export default MoreButton;
