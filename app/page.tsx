import Shop from "@/components/Shop";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Mini tienda</h1>
      <Shop />
    </main>
  );
}
