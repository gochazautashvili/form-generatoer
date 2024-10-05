import GeneratedForm from "@/components/GeneratedForm";
import { notFound } from "next/navigation";
import { getFormByFormId } from "./actions";

interface Props {
  params: { formId: string; linkId: string };
}

const QuestionnaireFormPage = async ({ params: { formId, linkId } }: Props) => {
  const form = await getFormByFormId(formId);

  if (!form) notFound();

  return <GeneratedForm edit={false} form={form} linkId={linkId} />;
};

export default QuestionnaireFormPage;
