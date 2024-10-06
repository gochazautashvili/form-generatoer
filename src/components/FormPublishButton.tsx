import { useTransition } from "react";
import { Button } from "./ui/button";
import { publish_form } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import StylePopover from "./StylePopover";
import { StylesType } from "@/types";
import { Form, Link as LinkType } from "@prisma/client";

interface Props {
  handleChangeStyles: (t: string, v: string | number) => void;
  styles: StylesType;
  form: Form & { links: LinkType[] };
}

const FormPublishButton = ({ handleChangeStyles, styles, form }: Props) => {
  const [isPending, startPublish] = useTransition();

  const publish = () => {
    if (isPending) return;

    startPublish(() => {
      publish_form().then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          toast({
            description: res.message,
          });
        }
      });
    });
  };

  return (
    <div className="fixed top-5 right-5 flex items-center gap-3">
      <Button
        onClick={publish}
        disabled={isPending}
        variant={form.published ? "destructive" : "default"}
      >
        {isPending && <Loader2 className="animate-spin mr-3 size-4" />}
        {form.published ? "Unpublish Form" : "Publish Form"}
      </Button>
      {form.published && form.links.length && (
        <Button asChild className="bg-green-500" disabled={!form.published}>
          <Link href={form.links[0].link}>Preview</Link>
        </Button>
      )}
      <StylePopover handleChangeStyles={handleChangeStyles} styles={styles} />
      <Button className="bg-green-500 hover:bg-green-700" asChild>
        <Link href="/questionnaire/form/links">View Form Links</Link>
      </Button>
    </div>
  );
};

export default FormPublishButton;
