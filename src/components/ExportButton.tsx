import * as XLSX from "xlsx";
import { Button } from "./ui/button";
import { FormSubmissionsType } from "@/types";
import { FileDown } from "lucide-react";

interface Props {
  jsonData: string;
}

const ExportButton = ({ jsonData }: Props) => {
  const exportToExcel = () => {
    const content: FormSubmissionsType[] = JSON.parse(jsonData);

    const worksheet = XLSX.utils.json_to_sheet(content);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "user_response.xlsx");
  };

  return (
    <Button onClick={exportToExcel} className="bg-green-500 hover:bg-green-700">
      <FileDown className="mr-3 size-4" /> Export
    </Button>
  );
};

export default ExportButton;
