import ProductDetail from "@/components/ProductDetail";
import { products } from "@/lib/products";

export default async function ProductPage(props: PageProps<"/producto/[id]">) {
  const { id } = await props.params;
  const product = products.find((item) => item.id === id)!;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <ProductDetail product={product} />
    </main>
  );
}
