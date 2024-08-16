import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_SERVER_URL}/dashboard`,
  }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (adminId) => {
        return `/stats?id=${adminId}`;
      },
      providesTags: ["Dashboard"],
    }),
    getPieStats: builder.query({
      query: (adminId) => {
        return `/pie?id=${adminId}`;
      },
      providesTags: ["Dashboard"],
    }),
    getBarStats: builder.query({
      query: (adminId) => {
        return `/bar?id=${adminId}`;
      },
      providesTags: ["Dashboard"],
    }),
    getLineStats: builder.query({
      query: (adminId) => {
        return `/line?id=${adminId}`;
      },
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetPieStatsQuery,
  useGetLineStatsQuery,
  useGetBarStatsQuery,
} = dashboardApi;
