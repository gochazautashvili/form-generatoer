import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { LaptopMinimal, Loader2 } from "lucide-react";
import { AiFormGenerate } from "./actions";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { prompts } from "@/lib/utils";

const formSchema = z.object({
  prompt: z.string().min(1).max(200),
});

interface Props {
  prompt: string | undefined;
}

const AIGeneratorDialog = ({ prompt }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startGenerate] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: prompt || prompts[Math.round(Math.random() * 5)],
    },
  });

  const handleGenerate = (values: z.infer<typeof formSchema>) => {
    startGenerate(() => {
      AiFormGenerate(values.prompt).then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          setOpen(false);
          toast({
            description: res.message,
          });
        }
      });
    });
  };

  const handleRandomPrompt = () => {
    const currentPrompt = form.getValues().prompt;
    const randomIndex = Math.round(Math.random() * 5);
    const randomPrompt = prompts[randomIndex];

    if (currentPrompt !== randomPrompt) {
      form.setValue("prompt", randomPrompt);
    } else if (randomIndex === 5) {
      form.setValue("prompt", prompts[randomIndex - 1]);
    } else {
      form.setValue("prompt", prompts[randomIndex + 1]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-400 font-semibold w-full">
          <LaptopMinimal className="size-4 mr-3" /> Generate Form With AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Form With AI</DialogTitle>
          <DialogDescription>
            Enter Prompt to generate form with ai (you also make form your
            language like this: language - georgian)
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerate)}>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} className="min-h-[160px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 justify-end mt-4">
              <Button
                type="button"
                onClick={handleRandomPrompt}
                disabled={isPending}
                variant="outline"
              >
                Generate Random Prompt
              </Button>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="bg-red-500"
              >
                Close
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-blue-500"
              >
                {isPending && <Loader2 className="animate-spin size-4 mr-3" />}
                Generate
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AIGeneratorDialog;
