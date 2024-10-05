import { getOrgForm } from "./actions";
import Generated from "./Generated";
import Generator from "./Generator";

const QuestionnaireCreatePage = async () => {
  const form = await getOrgForm();

  return (
    <main className="h-screen relative">
      <Generated form={form} />
      <Generator form={form} />
    </main>
  );
};

export default QuestionnaireCreatePage;
