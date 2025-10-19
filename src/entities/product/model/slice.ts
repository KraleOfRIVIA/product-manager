import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, NewProduct, UpdateProduct } from "./types";
import {
  getProducts,
  getCategories as apiGetCategories,
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from "../api/productsApi";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  categoriesLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
  categoriesLoading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => await getProducts(),
);
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => await apiGetCategories(),
);
export const addProduct = createAsyncThunk(
  "products/add",
  async (product: NewProduct) => await apiAddProduct(product),
);
export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: UpdateProduct) => await apiUpdateProduct(product),
);
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await apiDeleteProduct(id);
    return id;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка при загрузке товаров";
      });

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.categoriesLoading = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
      });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    });

    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      },
    );
  },
});

export default productsSlice.reducer;
