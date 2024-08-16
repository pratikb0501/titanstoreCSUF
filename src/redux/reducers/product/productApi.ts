import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateProductResponse,
  DeleteProductPayload,
  DeleteProductResponse,
  GetAllProductsResponse,
  GetCategoriesResponse,
  GetLatestProductsResponse,
  GetProductByIdResponse,
  ProductPayload,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductPayload,
} from "./productTypes";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_SERVER_URL}/products`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getLatestProducts: builder.query<GetLatestProductsResponse, void>({
      query: () => "/latest",
      providesTags: ["Product"],
    }),
    getAllProducts: builder.query<GetAllProductsResponse, void>({
      query: () => "/all",
      providesTags: ["Product"],
    }),
    getAdminProducts: builder.query<GetAllProductsResponse, void>({
      query: () => "/admin",
      providesTags: ["Product"],
    }),
    getAllCategories: builder.query<GetCategoriesResponse, void>({
      query: () => "/categories",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (productId) => `/${productId}`,
      providesTags: ["Product"],
    }),
    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, page, category, search, sort }) => {
        let baseQuery = `all?search=${search}&page=${page}`;
        if (price) {
          baseQuery += `&price=${price}`;
        }
        if (category) {
          baseQuery += `&category=${category}`;
        }
        if (sort) {
          baseQuery += `&sort=${sort}`;
        }
        return baseQuery;
      },
      providesTags: ["Product"],
    }),
    addNewProduct: builder.mutation<CreateProductResponse, ProductPayload>({
      query: (productPayload) => {
        const { adminId, ...payload } = productPayload;
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("photo", payload.photo);
        formData.append("category", payload.category);
        formData.append("price", payload.price.toString());
        formData.append("stock", payload.stock.toString());
        return {
          url: `/new?id=${adminId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      CreateProductResponse,
      UpdateProductPayload
    >({
      query: (productPayload) => {
        const { adminId, ...payload } = productPayload;
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("photo", payload.photo);
        formData.append("category", payload.category);
        formData.append("price", payload.price.toString());
        formData.append("stock", payload.stock.toString());
        return {
          url: `/${payload._id}?id=${adminId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<
      DeleteProductResponse,
      DeleteProductPayload
    >({
      query: (payload) => {
        const { productId, adminId } = payload;
        return {
          url: `/${productId}?id=${adminId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetLatestProductsQuery,
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetAdminProductsQuery,
  useSearchProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery
} = productApi;
