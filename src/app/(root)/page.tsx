import { getUserResponses } from "@/actions";
import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { FormSubmissionsType } from "@/types";
import Link from "next/link";
import MoreButton from "./MoreButton";

const Home = async () => {
  const res = await getUserResponses();

  return (
    <main className="w-full max-w-screen-xl px-3 mx-auto my-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/questionnaire/create">Create Questionnaire</Link>
        </Button>

        <SignOut />
      </div>
      <h1 className="text-xl font-bold mb-2 mt-7">User Responses:</h1>
      <div className="flex gap-5 flex-col">
        {res?.formSubmissions.map((item) => {
          const formData: FormSubmissionsType[] = JSON.parse(item.content);

          return (
            <div
              key={item.id}
              className="w-full py-3 px-5 bg-orange-600 text-white rounded-lg relative"
            >
              <MoreButton resId={item.id} jsonData={item.content} />
              {formData.map((filed, i) => {
                return (
                  <Card
                    key={i}
                    name={filed.filedName}
                    value={filed.filedValue}
                  />
                );
              })}
              {item.link && (
                <>
                  <h1 className="font-semibold uppercase mt-2 mb-1 border-b border-blue-400">
                    Location Info:
                  </h1>
                  <Card name="Code" value={item.link.code} />
                  <Card name="Name" value={item.link.name} />
                  <Card name="Location" value={item.link.location} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;

interface CardProps {
  name: string;
  value: string;
}

const Card = ({ name, value }: CardProps) => {
  return (
    <div className="flex items-start gap-2 border-b border-black py-1 first:pt-0">
      <h1 className="font-semibold capitalize">{name}:</h1>
      <p className="font-medium">{value}</p>
    </div>
  );
};
