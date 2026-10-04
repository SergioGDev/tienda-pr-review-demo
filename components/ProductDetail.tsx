"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

export default function ProductDetail({ product }: { product: Product }) {
  const { items, setItems } = useCart();

  const totalUnits: number = items.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(): void {
    setItems((current) => {
      const exists = current.some((item) => item.product.id === product.id);
      if (!exists) return [...current, { product, quantity: 1 }];
      return current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="underline">
          Volver a la tienda
        </Link>
        <p>
          Carrito: {totalUnits} {totalUnits === 1 ? "artículo" : "artículos"}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className={`aspect-square rounded-lg ${product.image}`} />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{product.description}</p>
          <p className="text-2xl font-medium">{euros.format(product.price)}</p>
          <button
            type="button"
            onClick={addToCart}
            className="rounded-md bg-foreground px-4 py-2 text-background"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
