"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { addProduct, fetchCategories } from "@/entities/product/model/slice";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { NewProduct } from "@/entities/product/model/types";

interface Props {
  onSuccess: () => void;
}

const AddProductForm = ({ onSuccess }: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

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
      addProduct({
        title,
        price: parseFloat(price),
        description,
        image,
        category,
      } as NewProduct),
    );
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 ">
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
        className="border rounded-lg px-3 py-2 w-full text-gray-300"
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
        <Button type="submit">Добавить</Button>
      </div>
    </form>
  );
};

export default AddProductForm;
