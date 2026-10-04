import type { Product } from "./products";

export type CartItem = { product: Product; quantity: number };

const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export function formatEuros(amount: number): string {
  return euros.format(amount);
}

// Suma en céntimos para evitar errores de coma flotante y redondea a 2 decimales.
export function calculateSubtotal(items: CartItem[]): number {
  const cents = items.reduce(
    (sum, { product, quantity }) => sum + Math.round(product.price * 100) * quantity,
    0,
  );
  return cents / 100;
}
