export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

// `image` es una clase de Tailwind con el color del placeholder.
export const products: Product[] = [
  {
    id: "camiseta",
    name: "Camiseta básica",
    description: "Camiseta de algodón suave y corte clásico. Perfecta para el día a día.",
    price: 19.99,
    image: "bg-rose-300",
  },
  {
    id: "sudadera",
    name: "Sudadera con capucha",
    description: "Sudadera cálida con capucha y bolsillo canguro. Ideal para los días fríos.",
    price: 39.95,
    image: "bg-sky-300",
  },
  {
    id: "gorra",
    name: "Gorra de algodón",
    description: "Gorra ligera con cierre ajustable. Se adapta a cualquier look.",
    price: 14.5,
    image: "bg-amber-300",
  },
  {
    id: "mochila",
    name: "Mochila urbana",
    description: "Mochila resistente con compartimento acolchado para portátil. Cómoda y espaciosa.",
    price: 54.9,
    image: "bg-emerald-300",
  },
  {
    id: "botella",
    name: "Botella térmica",
    description: "Botella de acero que mantiene las bebidas frías o calientes durante horas.",
    price: 24.99,
    image: "bg-violet-300",
  },
  {
    id: "libreta",
    name: "Libreta de notas",
    description: "Libreta de tapa dura con hojas rayadas. Para apuntes, ideas y listas.",
    price: 8.75,
    image: "bg-orange-300",
  },
];
