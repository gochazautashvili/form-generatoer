"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import GenerateFormLink from "@/components/GenerateFormLink";
import { useTransition } from "react";
import { Link as LinkType } from "@prisma/client";
import { delete_all_link } from "./actions";
import { toast } from "@/hooks/use-toast";

interface DataTableViewOptionsProps {
  table: Table<LinkType>;
}

export function DataTableViewOptions({ table }: DataTableViewOptionsProps) {
  const [isDeleting, startDelete] = useTransition();
  const selectedLinks = table.getFilteredSelectedRowModel().rows;

  const handleDeleteLinks = () => {
    const linkIds = selectedLinks.flatMap((item) => item.original.id);

    startDelete(() => {
      delete_all_link(linkIds).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) toast({ description: res.message });
      });
    });
  };

  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Filter by code..."
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by location..."
          value={
            (table.getColumn("location")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("location")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button asChild size="sm" className="ml-auto hidden h-8 lg:flex">
          <Link href="/questionnaire/create">
            <ArrowLeft />
          </Link>
        </Button>
        {!!selectedLinks.length && (
          <Button
            size="sm"
            className="h-8"
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDeleteLinks}
          >
            {isDeleting && <Loader2 className="animate-spin size-4 mr-3" />}
            <Trash className="size-4 mr-2" /> Delete All
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <GenerateFormLink />
      </div>
    </div>
  );
}
