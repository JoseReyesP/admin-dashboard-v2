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
    updateProduct: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-Product:", params);
        const body = {
          title: params.get("title"),
          price: params.get("price"),
          stock: params.get("stock"),
          description: params.get("description"),
          image: params.get("image"),
        };
        const config = {
          url: `/api/product/${params.get("id")}`,
          method: "PUT",
          body: body,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNGM2NTVlMTRiMzE0ODRhMWNhOGUiLCJpYXQiOjE3MDUwMDUzNjd9.gR7JcF7BYRl4bpqC4j3ATV0lP1-xrTb_7LZKqatxv5g",
          },
        };
        return config;
      },
      invalidatesTags: ["Product", "Products"],
    }),
    updateReview: build.mutation({
      query: (params) => {
        const config = {
          url: `/api/review/${params.id}`,
          method: "PUT",
          body: params.updatedData,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNGM2NTVlMTRiMzE0ODRhMWNhOGUiLCJpYXQiOjE3MDUwMDUzNjd9.gR7JcF7BYRl4bpqC4j3ATV0lP1-xrTb_7LZKqatxv5g",
          },
        };
        return config;
      },
      invalidatesTags: ["Product", "Review", "Users"],
    }),
    postNewPhoto: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-Photo:", params);
        const config = {
          url: "/api/photos",
          method: "POST",
          body: params,
        };
        return config;
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetReviewQuery,
  useUpdateProductMutation,
  useUpdateReviewMutation,
  usePostNewPhotoMutation,
} = api;
