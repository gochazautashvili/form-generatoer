import { getOrganization } from "@/data/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  const org = await getOrganization();

  if (org) redirect("/");

  return (
    <main className="flex items-center justify-center w-full h-screen">
      {children}
    </main>
  );
};

export default layout;
