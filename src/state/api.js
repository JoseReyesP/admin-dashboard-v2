import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Users"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/api/users/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "/api/product",
      providesTags: ["Products"],
    }),
    getUsers: build.query({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetUsersQuery } = api;
