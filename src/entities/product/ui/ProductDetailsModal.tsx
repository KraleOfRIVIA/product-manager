"use client";

import { useState } from "react";
import { Modal } from "@/shared/ui/Modal";
import { EditProductForm } from "@/features/edit-product/ui/EditProductForm";
import { Button } from "@/shared/ui/Button";
import Image from "next/image";
import { DeleteButton } from "@/features/remove-product/ui/DeleteButton";
import { ProductDetailsModalProps } from "../model/types";

export const ProductDetailsModal = ({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.title}>
      {!isEditing ? (
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-center items-center bg-gray-100 rounded-md overflow-hidden h-64">
            <Image
              width={300}
              height={256}
              src={product.image}
              alt={product.title}
              className="object-contain max-h-60"
              style={{ width: "auto", height: "100%" }}
            />
          </div>
          <p className="text-gray-700">{product.description}</p>
          <p className="font-semibold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{product.category}</p>

          <div className="flex gap-2 mt-4">
            <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            <DeleteButton productId={product.id} onDeleted={() => onClose()} />
          </div>
        </div>
      ) : (
        <EditProductForm
          product={product}
          onSave={() => {
            setIsEditing(false);
            onClose();
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </Modal>
  );
};
