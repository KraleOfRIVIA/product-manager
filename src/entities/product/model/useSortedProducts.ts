import { useMemo } from "react";
import { Product } from "../model/types";

export type SortKey = "price" | "rating";
export type SortOrder = "asc" | "desc" | null;

interface UseSortedProductsParams {
  products: Product[];
  sortKey: SortKey | null;
  sortOrder: SortOrder;
}

export const useSortedProducts = ({
  products,
  sortKey,
  sortOrder,
}: UseSortedProductsParams) => {
  const sortedProducts = useMemo(() => {
    if (!sortKey || !sortOrder) return products;

    const sorted = [...products].sort((a, b) => {
      const aValue = sortKey === "price" ? a.price : (a.rating?.rate ?? 0);
      const bValue = sortKey === "price" ? b.price : (b.rating?.rate ?? 0);

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [products, sortKey, sortOrder]);

  return sortedProducts;
};
