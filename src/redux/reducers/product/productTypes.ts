export interface Product {
  name: string;
  photo: File;
  price: number;
  stock: number;
  category: string;
  description: string;
}

export interface ProductResponse extends Product {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProductPayload {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  photo: string | File;
  createdAt: string;
  updatedAt: string;
  adminId: string;
}

export interface ProductPayload extends Product {
  adminId: string;
}

export interface GetLatestProductsResponse {
  latestProducts: ProductResponse[];
  success: boolean;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}
export interface CreateProductResponse {
  success: boolean;
  message: string;
}

export interface DeleteProductPayload {
  productId: string;
  adminId: string;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
}

export type GetAllProductsResponse = {
  success: boolean;
  products: ProductResponse[];
  totalPages: number;
};

export interface GetCategoriesResponse {
  success: boolean;
  categories: string[];
}

export interface SearchProductsResponse {
  success: boolean;
  products: ProductResponse[];
  totalPages: number;
}

export interface SearchProductsRequest {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
}

export type GetProductByIdResponse = {
  success: boolean;
  product: {
    _id: string;
    name: string;
    description: string;
    photo: string;
    price: number;
    stock: number;
    category: string;
  };
};

export type SingleProduct={
  _id: string;
  name: string;
  description: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}
