"use client";
import AIGeneratorDialog from "./AiGeneratorDialog";
import CreateFiledDialog from "./CreateFiledDialog";
import FormDeleteDialog from "./FormDeleteDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Form } from "@prisma/client";

interface Props {
  form: Form | null;
}

const Generator = ({ form }: Props) => {
  return (
    <section className="py-3 fixed bottom-0 left-0 right-0 border-t-2 border-green-500 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-4 w-full max-w-screen-xl mx-auto px-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <AIGeneratorDialog prompt={form?.prompt} />
        <CreateFiledDialog type="create" content={form?.content} />
        {form && <FormDeleteDialog />}
      </div>
    </section>
  );
};

export default Generator;
