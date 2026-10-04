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

export type Coupon = {
  code: string;
  kind: "percent" | "fixed";
  value: number;
};

export const COUPONS: Coupon[] = [
  { code: "BIENVENIDO10", kind: "percent", value: 10 },
  { code: "MENOS5", kind: "fixed", value: 5 },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((coupon) => coupon.code === normalized);
}

export function calculateDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) return 0;
  if (coupon.kind === "fixed") return coupon.value;
  return Math.round(subtotal * coupon.value) / 100;
}

export function calculateTotal(items: CartItem[], coupon: Coupon | null): number {
  const subtotal = calculateSubtotal(items);
  const cents = Math.round(subtotal * 100) - Math.round(calculateDiscount(subtotal, coupon) * 100);
  return cents / 100;
}
