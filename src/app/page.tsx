"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { fetchProducts } from "@/entities/product/model/slice";
import { ProductList } from "@/widgets/product-list/ui/ProductList";
import { Modal } from "@/shared/ui/Modal";
import ProductForm from "@/features/add-product/ui/AddProductModal";
import { Button } from "@/shared/ui/Button";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            🛍️ Менеджер товаров
          </h1>
          <Button onClick={() => setIsModalOpen(true)}>Добавить товар</Button>
        </div>
        <ProductList products={products} loading={loading} error={error} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить товар"
      >
        <ProductForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </main>
  );
}
