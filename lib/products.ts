export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// `image` es una clase de Tailwind con el color del placeholder.
export const products: Product[] = [
  { id: "camiseta", name: "Camiseta básica", price: 19.99, image: "bg-rose-300" },
  { id: "sudadera", name: "Sudadera con capucha", price: 39.95, image: "bg-sky-300" },
  { id: "gorra", name: "Gorra de algodón", price: 14.5, image: "bg-amber-300" },
  { id: "mochila", name: "Mochila urbana", price: 54.9, image: "bg-emerald-300" },
  { id: "botella", name: "Botella térmica", price: 24.99, image: "bg-violet-300" },
  { id: "libreta", name: "Libreta de notas", price: 8.75, image: "bg-orange-300" },
];
