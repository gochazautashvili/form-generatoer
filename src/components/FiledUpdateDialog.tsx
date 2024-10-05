import CreateFiledDialog from "@/app/(root)/questionnaire/create/CreateFiledDialog";
import { GeneratedFormType } from "@/types";

interface Props {
  jsonForm: string;
  fieldId: string;
  onEdit: () => void;
}

const FiledUpdateDialog = ({ fieldId, jsonForm, onEdit }: Props) => {
  const formData: GeneratedFormType = JSON.parse(jsonForm || "[]");
  const field = formData.formFields.filter((item) => item.id === fieldId)[0];

  return (
    <CreateFiledDialog
      onEdit={onEdit}
      field={field}
      formData={formData}
      type="edit"
    />
  );
};

export default FiledUpdateDialog;
