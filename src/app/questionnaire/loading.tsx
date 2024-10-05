import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <Loader2 className="size-6 animate-spin" />
    </main>
  );
};

export default loading;
