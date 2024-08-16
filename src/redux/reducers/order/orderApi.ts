import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  CreateOrderResponse,
  MyOrderResponse,
  NewOrderRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
  UpdateOrderStatusReponse,
  UpdateOrderStatusRequest,
} from "./orderTypes";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_SERVER_URL}/orders`,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation<CreateOrderResponse, NewOrderRequest>({
      query: (orderPayload) => ({
        url: "/new",
        method: "POST",
        body: orderPayload,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<UpdateOrderStatusReponse, UpdateOrderStatusRequest>({
      query: ({ adminId, orderId }) => ({
        url: `/${orderId}?id=${adminId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<CreateOrderResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `/${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    myOrders: builder.query<MyOrderResponse, string>({
      query: (userId) => `/my?id=${userId}`,
      providesTags: ["Order"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (userId) => `/all?id=${userId}`,
      providesTags: ["Order"],
    }),
    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (orderId) => `/${orderId}`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
