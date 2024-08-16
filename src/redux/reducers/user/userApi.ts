import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUserResponse, GetAllUsersResponse, GetUserByIdResponse, User } from "./userTypes";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_SERVER_URL}/user`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetAllUsersResponse, string>({
      query: (adminId) => {
        return `/all?id=${adminId}`
      },
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `/${userId}`,
      providesTags: ["User"],
    }),
    createNewUser: builder.mutation<CreateUserResponse, User>({
      query: (userPayload) => ({
        url: "/new",
        method: "POST",
        body: userPayload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const getUserById = async(userId:string)=>{
  try {
    const {data}:{data:GetUserByIdResponse} = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/user/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
}



export const {
  useCreateNewUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} = userApi;
