"use client";

import { useState } from "react";
import { calculateSubtotal, formatEuros, type CartItem } from "@/lib/pricing";
import { products, type Product } from "@/lib/products";

export default function Shop() {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product): void {
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

  function changeQuantity(productId: string, delta: number): void {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId: string): void {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <ul className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="overflow-hidden rounded-lg border border-black/10 dark:border-white/15"
          >
            <div className={`aspect-square ${product.image}`} />
            <div className="p-4">
              <h2 className="font-medium">{product.name}</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {formatEuros(product.price)}
              </p>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-3 w-full rounded-md bg-foreground px-3 py-2 text-sm text-background"
              >
                Añadir al carrito
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="rounded-lg border border-black/10 p-4 lg:sticky lg:top-6 lg:w-80 dark:border-white/15">
        <h2 className="mb-4 text-xl font-semibold">Carrito</h2>
        {items.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">Tu carrito está vacío</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <span className="font-medium">{product.name}</span>
                  <span>{formatEuros(product.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Quitar una unidad de ${product.name}`}
                    onClick={() => changeQuantity(product.id, -1)}
                    className="h-8 w-8 rounded border border-black/20 dark:border-white/25"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    aria-label={`Añadir una unidad de ${product.name}`}
                    onClick={() => changeQuantity(product.id, 1)}
                    className="h-8 w-8 rounded border border-black/20 dark:border-white/25"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="ml-auto text-sm underline"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 && (
          <p className="mt-4 flex justify-between border-t border-black/10 pt-4 font-semibold dark:border-white/15">
            <span>Total</span>
            <span>{formatEuros(calculateSubtotal(items))}</span>
          </p>
        )}
      </aside>
    </div>
  );
}
