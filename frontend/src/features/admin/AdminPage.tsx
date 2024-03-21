import TableComponent from "../../components/component/Table";
import CreateProductForm from "@/components/component/CreateProductForm";

export default function AdminPage() {
  return (
    <>
      <h1 className="my-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Admin space
      </h1>
      <div className=" w-auto mx-10 flex justify-around">
        <CreateProductForm />
        <TableComponent />
      </div>
    </>
  );
}
