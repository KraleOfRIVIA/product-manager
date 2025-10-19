"use client";

import { useEffect, useState } from "react";
import { Store } from 'lucide-react';
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
        <div className="mb-5">
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 mb-4">
            <Store
              className="inline-block"
              size={32}
            />
            <span>Менеджер товаров</span>
            </h1>
            <div className="flex w-full">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full"
            >
              Добавить товар
            </Button>
            </div>
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
