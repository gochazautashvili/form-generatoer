"use client";
import GeneratedForm from "@/components/GeneratedForm";
import { Form, Link } from "@prisma/client";

interface Props {
  form: (Form & { links: Link[] }) | null;
}

const Generated = ({ form }: Props) => {
  if (!form) {
    return (
      <section className="h-full flex justify-center items-center text-xl font-semibold ">
        <h1>Create Form</h1>
      </section>
    );
  }

  return (
    <section className="w-full space-y-4">
      {form && <GeneratedForm edit={true} form={form} />}
    </section>
  );
};

export default Generated;
