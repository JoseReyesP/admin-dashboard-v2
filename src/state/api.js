import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Users", "Products", "Product", "Review"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/api/users/${id}`,
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),
    getProducts: build.query({
      query: () => "/api/product",
      providesTags: ["Products"],
    }),
    getProduct: build.query({
      query: (id) => `api/product/${id}`,
      providesTags: ["Product"],
    }),
    getReview: build.query({
      query: (id) => `api/review/${id}`,
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetReviewQuery,
} = api;
