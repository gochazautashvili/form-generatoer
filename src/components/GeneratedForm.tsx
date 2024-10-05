"use client";
import { GeneratedFormType, StylesType } from "@/types";
import { Button } from "./ui/button";
import FiledGenerator from "./FiledGenerator";
import { FormEventHandler, useRef, useState, useTransition } from "react";
import { submit_form } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import MoreButton from "./MoreButton";
import FormPublishButton from "./FormPublishButton";
import { format } from "date-fns";
import { Form, Link } from "@prisma/client";

interface Props {
  form: Form & { links: Link[] };
  edit: boolean;
  linkId?: string;
}

const GeneratedForm = ({ form, edit, linkId }: Props) => {
  const formData: GeneratedFormType = JSON.parse(form?.content || "[]");

  const router = useRouter();
  const [isPending, startSubmit] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [styles, setStyles] = useState<StylesType>({
    background: form.background,
    formBackground: form.formBackground,
    borderColor: form.borderColor,
    textColor: form.textColor,
    borderWidth: form.borderWidth,
    formBorder: form.formBorder,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const formDataEntries = Object.fromEntries(formData.entries());

    const formFieldNames = Array.from(formData.keys());

    const values = [
      ...formFieldNames.map((item) => ({
        filedName: item,
        filedValue: formDataEntries[item],
      })),
      {
        filedName: "createdAt",
        filedValue: format(Date.now(), "hh.mm - dd.MM.yyyy"),
      },
    ];

    const jsonForm = JSON.stringify(values);

    if (edit) return;

    startSubmit(() => {
      submit_form(jsonForm, form.organizationId, linkId).then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          router.push(res.url);
          formRef.current?.reset();
          toast({ description: res.message });
        }
      });
    });
  };

  const handleChangeStyles = (type: string, value: string | number) => {
    setStyles((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div
      style={{
        background: styles.background,
        color: styles.textColor,
      }}
      className="flex items-center justify-center w-full h-full min-h-screen py-8 relative pb-24"
    >
      {edit && (
        <FormPublishButton
          form={form}
          styles={styles}
          handleChangeStyles={handleChangeStyles}
        />
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          background: styles.formBackground,
          borderColor: styles.formBorder,
          borderWidth: styles.borderWidth,
        }}
        className="flex flex-col gap-5 p-5 border border-black bg-white rounded-lg max-w-[700px] w-full mx-auto font-sans"
      >
        <div className="flex flex-col gap-1 mb-3">
          <h1 className="text-2xl font-bold text-center">
            {formData.formTitle}
          </h1>
          <p className="text-sm text-center">{formData.formSubheading}</p>
        </div>
        {formData?.formFields?.map((item, i) => {
          return (
            <div className="flex flex-col gap-1" key={i}>
              <div className="flex items-center justify-between">
                <Label
                  className="font-semibold mb-1"
                  htmlFor={`${item.fieldName}`}
                >
                  {item.fieldLabel}
                </Label>
                {edit && (
                  <MoreButton
                    formId={form.id}
                    filedId={item.id}
                    jsonForm={JSON.stringify(formData)}
                  />
                )}
              </div>
              <FiledGenerator
                id={item.id}
                borderColor={styles.borderColor}
                fieldName={item.fieldName}
                fieldType={item.fieldType}
                placeholder={item.placeholder}
                fieldLabel={item.fieldLabel}
                required={item.required}
                options={item.options}
              />
            </div>
          );
        })}
        <Button
          disabled={isPending}
          type="submit"
          className="border"
          style={{ borderColor: styles.borderColor }}
        >
          {isPending && <Loader2 className="animate-spin size-4 mr-3" />}
          Submit
        </Button>
      </form>
    </div>
  );
};

export default GeneratedForm;
