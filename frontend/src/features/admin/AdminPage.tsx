import ProfileForm from "@/components/component/ProfilForm";
import ProductPage from "./product/ProductPage";

export default function AdminPage() {
  return (
    <>
      <h1 className="m-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Page administrateur
      </h1>
      <div className=" w-auto mx-10 flex justify-around">
        <ProfileForm />
        <ProductPage />
      </div>
    </>
  );
}
