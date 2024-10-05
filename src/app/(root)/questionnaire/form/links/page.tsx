import { getFormLinks } from "./actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function FormLinksPage() {
  const data = await getFormLinks();

  return (
    <main className="container mx-auto py-10 px-2">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
