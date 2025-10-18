"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { EditProductFormProps } from "../model/types";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { updateProduct, fetchCategories } from "@/entities/product/model/slice";

export const EditProductForm = ({
  product,
  onSave,
  onCancel,
}: EditProductFormProps) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState(product.category);

  const categories = useAppSelector(
    (state: { products: { categories: string[] } }) =>
      state.products.categories,
  );
  const categoriesLoading = useAppSelector(
    (state: { products: { categoriesLoading: boolean } }) =>
      state.products.categoriesLoading,
  );

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      updateProduct({
        id: product.id,
        title,
        price: parseFloat(price),
        description,
        image,
        category,
      }),
    );
    onSave?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
      />
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Цена"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
      />
      <Input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="URL изображения"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
        required
        disabled={categoriesLoading}
      >
        <option value="" disabled>
          {categoriesLoading ? "Загрузка категорий..." : "Выберите категорию"}
        </option>
        {categories.map((c: string) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
