import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentPayload, PaymentResponse } from "./paymentType";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_SERVER_URL}/payment`,
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    createNewPayment: builder.mutation<PaymentResponse, number>({
      query: (amount) => {
        return {
          url: `/create`,
          method: "POST",
          body: {amount},
        };
      },
      invalidatesTags: ["Payment"],
    })
  }),
});

export const {
  useCreateNewPaymentMutation
} = paymentApi;
