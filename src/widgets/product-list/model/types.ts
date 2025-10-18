import { Product } from "@/entities/product/model/types";

export interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}
