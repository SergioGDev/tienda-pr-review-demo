import { formatEuros, type CartItem } from "@/lib/pricing";

type CartRowProps = {
  item: CartItem;
  onChangeQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
};

export default function CartRow({
  item,
  onChangeQuantity,
  onRemove,
}: CartRowProps) {
  const { product, quantity } = item;

  return (
    <li className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <span className="font-medium">{product.name}</span>
        <span>{formatEuros(product.price)}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Quitar una unidad de ${product.name}`}
          onClick={() => onChangeQuantity(product.id, -1)}
          className="h-8 w-8 rounded border border-black/20 dark:border-white/25"
        >
          −
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          type="button"
          aria-label={`Añadir una unidad de ${product.name}`}
          onClick={() => onChangeQuantity(product.id, 1)}
          className="h-8 w-8 rounded border border-black/20 dark:border-white/25"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          className="ml-auto text-sm underline"
        >
          Quitar
        </button>
      </div>
    </li>
  );
}
