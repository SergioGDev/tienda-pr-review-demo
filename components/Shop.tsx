"use client";

import { useState } from "react";
import CartRow from "@/components/CartRow";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [hasCouponError, setHasCouponError] = useState<boolean>(false);

  function addToCart(product: Product): void {
    setCartItems((currentItems) => {
      const exists = currentItems.some((item) => item.product.id === product.id);
      if (!exists) return [...currentItems, { product, quantity: 1 }];
      return currentItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function changeItemQuantity(productId: string, delta: number): void {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(productId: string): void {
    setCartItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  }

  function applyCoupon(): void {
    const found = findCoupon(couponCode);
    if (!found) {
      setHasCouponError(true);
      return;
    }
    setAppliedCoupon(found);
    setHasCouponError(false);
    setCouponCode("");
  }

  function removeCoupon(): void {
    setAppliedCoupon(null);
  }

  const subtotal: number = calculateSubtotal(cartItems);
  const discount: number = calculateDiscount(subtotal, appliedCoupon);

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
        {cartItems.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">Tu carrito está vacío</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartRow
                key={item.product.id}
                item={item}
                onDecrease={() => changeItemQuantity(item.product.id, -1)}
                onIncrease={() => changeItemQuantity(item.product.id, 1)}
                onRemove={() => removeItem(item.product.id)}
              />
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4 flex flex-col gap-4 border-t border-black/10 pt-4 dark:border-white/15">
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) => {
                    setCouponCode(event.target.value);
                    setHasCouponError(false);
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
              {hasCouponError && (
                <p className="mt-1 text-sm text-red-600">Cupón no válido</p>
              )}
              {appliedCoupon && (
                <p className="mt-2 flex items-center justify-between text-sm">
                  <span>Cupón: {appliedCoupon.code}</span>
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
              {appliedCoupon && (
                <div className="flex justify-between">
                  <dt>Descuento</dt>
                  <dd>{formatEuros(-discount)}</dd>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <dt>Total</dt>
                <dd>{formatEuros(calculateTotal(cartItems, appliedCoupon))}</dd>
              </div>
            </dl>
          </div>
        )}
      </aside>
    </div>
  );
}
