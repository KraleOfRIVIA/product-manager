import { Product } from "@/entities/product/model/types";

export interface EditProductFormValues {
  title: string;
  price: string;
}

export interface EditProductFormProps {
  product: Product;
  onSave?: () => void;
  onCancel: () => void;
}
