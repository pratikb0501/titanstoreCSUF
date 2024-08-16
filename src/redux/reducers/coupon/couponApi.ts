import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllCouponsResponse,
  CouponPayload,
  DeleteCouponPayload,
  DeleteCouponResponse,
  NewCouponResponse,
  verifyCouponResponse,
} from "./couponTypes";
import axios from "axios";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_SERVER_URL}/payment/coupon`,
  }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    getAllCoupons: builder.query<AllCouponsResponse, string>({
      query: (adminId) => {
        return `/all?id=${adminId}`;
      },
      providesTags: ["Coupon"],
    }),
    createNewCoupon: builder.mutation<NewCouponResponse, CouponPayload>({
      query: (productPayload) => {
        const { adminId, ...payload } = productPayload;
        return {
          url: `/new?id=${adminId}`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation<DeleteCouponResponse, DeleteCouponPayload>({
      query: (payload) => {
        const { couponId, adminId } = payload;
        return {
          url: `/${couponId}?id=${adminId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const verifyCoupon = async (couponCode: string) => {
  try {
    const {data} = await axios.get(
      `${
        import.meta.env.VITE_API_SERVER_URL
      }/payment/discount?couponCode=${couponCode}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const {
  useGetAllCouponsQuery,
  useCreateNewCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
