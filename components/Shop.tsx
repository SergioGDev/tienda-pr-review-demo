"use client";

import { useState } from "react";
import {
  calculateDiscount,
  calculateSubtotal,
  calculateTotal,
  findCoupon,
  formatEuros,
  type CartItem,
  type Coupon,
} from "@/lib/pricing";
import { products, type Product } from "@/lib/products";

export default function Shop() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponInput, setCouponInput] = useState<string>("");
  const [couponError, setCouponError] = useState<boolean>(false);

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

  function applyCoupon(): void {
    const found = findCoupon(couponInput);
    if (!found) {
      setCouponError(true);
      return;
    }
    setCoupon(found);
    setCouponError(false);
    setCouponInput("");
  }

  function removeCoupon(): void {
    setCoupon(null);
  }

  const subtotal: number = calculateSubtotal(items);
  const discount: number = calculateDiscount(subtotal, coupon);

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
          <div className="mt-4 flex flex-col gap-4 border-t border-black/10 pt-4 dark:border-white/15">
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(event) => {
                    setCouponInput(event.target.value);
                    setCouponError(false);
                  }}
                  placeholder="Código de cupón"
                  aria-label="Código de cupón"
                  className="min-w-0 flex-1 rounded border border-black/20 bg-transparent px-2 py-1 dark:border-white/25"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="rounded bg-foreground px-3 py-1 text-sm text-background"
                >
                  Aplicar
                </button>
              </div>
              {couponError && (
                <p className="mt-1 text-sm text-red-600">Cupón no válido</p>
              )}
              {coupon && (
                <p className="mt-2 flex items-center justify-between text-sm">
                  <span>Cupón: {coupon.code}</span>
                  <button type="button" onClick={removeCoupon} className="underline">
                    Quitar cupón
                  </button>
                </p>
              )}
            </div>
            <dl className="flex flex-col gap-1">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatEuros(subtotal)}</dd>
              </div>
              {coupon && (
                <div className="flex justify-between">
                  <dt>Descuento</dt>
                  <dd>{formatEuros(-discount)}</dd>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <dt>Total</dt>
                <dd>{formatEuros(calculateTotal(items, coupon))}</dd>
              </div>
            </dl>
          </div>
        )}
      </aside>
    </div>
  );
}
