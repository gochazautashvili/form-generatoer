"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Link as LinkType } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EditLinkDialog from "./EditLinkDialog";
import DeleteLinkDialog from "./DeleteLinkDialog";
import Link from "next/link";

export const columns: ColumnDef<LinkType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const { link, id } = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
            {link && (
              <>
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href={link}>Preview This Link</Link>
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_URL}${link}`
                    )
                  }
                >
                  Copy Link
                </Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
                  <Link href={`/questionnaire/form/links/${id}`}>QrCode</Link>
                </Button>
              </>
            )}

            <EditLinkDialog link={row.original} />
            <DeleteLinkDialog linkId={id} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
