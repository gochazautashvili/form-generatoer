"use client";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2, Pencil } from "lucide-react";
import { generate_form_links } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

const GenerateFormLink = () => {
  const [isPending, startGenerate] = useTransition();
  const [length, setLength] = useState(1);

  const handleGenerateFormLinks = () => {
    startGenerate(() => {
      generate_form_links(length).then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          toast({ description: res.message });
        }
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-700 h-8" size="sm">
          {isPending && <Loader2 className="animate-spin mr-3 size-4" />}
          <Pencil className="size-4 mr-2" /> Generate Form Links
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1">
        <Input
          onChange={(e) => setLength(e.target.valueAsNumber)}
          placeholder="Links length"
          value={length}
          type="number"
          min={0}
          max={20}
        />
        <Button
          disabled={isPending}
          onClick={handleGenerateFormLinks}
          className="bg-green-500 hover:bg-green-700 w-full"
        >
          {isPending && <Loader2 className="animate-spin mr-3 size-4" />}
          Generate
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default GenerateFormLink;
