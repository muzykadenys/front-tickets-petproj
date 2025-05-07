import { DataTable } from "@/components/data-displayer";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col gap-[40px] p-[10px]">
      <Header />

      <DataTable />
    </div>
  );
}
