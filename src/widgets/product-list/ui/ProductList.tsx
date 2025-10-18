"use client";

import { useState } from "react";
import { Product } from "@/entities/product/model/types";
import ProductCard from "@/entities/product/ui/ProductCard";
import {
  useSortedProducts,
  SortKey,
  SortOrder,
} from "@/entities/product/model/useSortedProducts";
import { ProductDetailsModal } from "@/entities/product/ui/ProductDetailsModal";
import { ProductListProps } from "../model/types";

export const ProductList = ({ products, loading, error }: ProductListProps) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sortedProducts = useSortedProducts({ products, sortKey, sortOrder });

  if (loading) return <p className="text-gray-500">Загрузка товаров...</p>;
  if (error) return <p className="text-red-500">Ошибка: {error}</p>;
  if (!products.length) return <p className="text-gray-500">Нет товаров</p>;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <select
          className="border rounded-lg px-3 py-2 bg-white"
          value={sortKey ?? ""}
          onChange={(e) =>
            setSortKey(e.target.value ? (e.target.value as SortKey) : null)
          }
        >
          <option value="">Без сортировки</option>
          <option value="price">По цене</option>
          <option value="rating">По рейтингу</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 bg-white"
          value={sortOrder ?? ""}
          onChange={(e) =>
            setSortOrder(e.target.value ? (e.target.value as SortOrder) : null)
          }
        >
          <option value="">Порядок</option>
          <option value="asc">Возрастание</option>
          <option value="desc">Убывание</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
        ))}
      </div>

      <ProductDetailsModal
        product={selectedProduct!}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
