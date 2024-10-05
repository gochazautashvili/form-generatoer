import { FormSubmissionsType } from "@/types";
import { getUserResByResId } from "./actions";

interface Props {
  params: { resId: string };
}

const SuccessPage = async ({ params: { resId } }: Props) => {
  const res = await getUserResByResId(resId);
  const formData: FormSubmissionsType[] = JSON.parse(res.content);

  return (
    <main className="flex flex-col gap-10 items-center justify-center w-full h-screen max-w-screen-xl px-3 mx-auto">
      <div className="w-[400px] flex flex-col rounded-lg shadow-md items-center text-center p-4">
        <h1 className="text-xl font-bold mb-1">Form Successfully Submitted</h1>
        <p className="font-medium text-gray-400">
          form data sended thanks for your response. you can see your submitted
          form data here
        </p>
      </div>
      <div className="w-full py-3 px-5 border border-black rounded-lg">
        {formData.map((filed, i) => {
          return (
            <div
              key={i}
              className="flex items-center gap-2 border-b border-black py-1 last:border-none last:pb-0 first:pt-0"
            >
              <h1 className="font-bold">{filed.filedName}: </h1>
              <p className="font-medium">{filed.filedValue}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default SuccessPage;
