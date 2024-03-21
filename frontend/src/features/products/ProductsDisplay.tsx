import CardWithForm from "@/components/component/Card";
import { useProductsQuery } from "../../graphql/queries/generated/GetProducts";

export default function ProductsDisplay() {
  const { data, loading, error, refetch } = useProductsQuery();
  const products = data ? data.products : [];
  return (
    <>
      <h1 className="my-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Welcome to Wildmazon
      </h1>
      <div className="flex justify-center gap-4">
        {products.map((p) => (
          <CardWithForm
            key={p.id}
            title={p.name}
            description={p.description}
            price={p.price}
            picture={p.picture}
            id={parseInt(p.id)}
          />
        ))}
      </div>
    </>
  );
}
