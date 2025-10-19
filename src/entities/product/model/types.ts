export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface NewProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface UpdateProduct {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}
export interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}
