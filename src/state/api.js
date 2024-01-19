import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthTokenFromCookies } from "./getAuthTokenCookies";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pf-15a.up.railway.app" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Users", "Products", "Product", "Review", "Categories"],
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
    getCategories: build.query({
      query: () => `api/category`,
      providesTags: ["Categories"],
    }),
    login: build.mutation({
      query: ({ email, password }) => {
        console.log("🚀 ~ email, password:", email, password);
        const body = {
          email: email,
          password: password,
        };
        return {
          url: "/auth/signin",
          method: "POST",
          body: body,
        };
      },
      providesTags: ["adminUser"],
    }),

    updateProduct: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-Product:", params);
        const body = {
          title: params.get("title"),
          price: params.get("price"),
          stock: params.get("stock"),
          category: params.get("category"),
          description: params.get("description"),
          image: params.get("image"),
        };
        const token = getAuthTokenFromCookies();
        const config = {
          url: `/api/product/${params.get("id")}`,
          method: "PUT",
          body: body,
          headers: { Authorization: `Bearer ${token}` },
        };
        console.log("🚀 ~ config:", config);

        return config;
      },
      invalidatesTags: ["Product", "Products"],
    }),
    disableProduct: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-DisableProduct:", params);
        const body = {
          isDeleted: params.isDeleted,
        };
        const token = getAuthTokenFromCookies();
        const config = {
          url: `/api/product/${params.id}`,
          method: "PUT",
          body: body,
          headers: { Authorization: `Bearer ${token}` },
        };
        console.log("🚀 ~ config:", config);

        return config;
      },
      invalidatesTags: ["Product", "Products"],
    }),
    disableUser: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-DisableUser:", params);
        const body = {
          isDeleted: params.isDeleted,
        };
        const token = getAuthTokenFromCookies();
        const config = {
          url: `/api/users/${params.id}`,
          method: "PUT",
          body: body,
          headers: { Authorization: `Bearer ${token}` },
        };
        console.log("🚀 ~ config:", config);

        return config;
      },
      invalidatesTags: ["User", "Users"],
    }),
    updateReview: build.mutation({
      query: (params) => {
        const token = getAuthTokenFromCookies();
        const config = {
          url: `/api/review/${params.id}`,
          method: "PUT",
          body: { isDeleted: params.isDeleted },
          headers: { Authorization: `Bearer ${token}` },
        };
        return config;
      },
      invalidatesTags: ["Product", "Review", "Users", "User"],
    }),
    createProduct: build.mutation({
      query: (params) => {
        const token = getAuthTokenFromCookies();
        const config = {
          url: "/api/product",
          method: "POST",
          body: params.newProduct,
          headers: { Authorization: `Bearer ${token}` },
        };
        return config;
      },
      invalidatesTags: ["Products"],
    }),
    uploadPhoto: build.mutation({
      query: (params) => {
        const token = getAuthTokenFromCookies();
        const config = {
          url: "/api/photos",
          method: "POST",
          body: params.formDataPhoto,
          headers: { Authorization: `Bearer ${token}` },
        };
        return config;
      },
    }),
    postNewPhoto: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-Photo:", params);
        const token = getAuthTokenFromCookies();
        const config = {
          url: "/api/photos",
          method: "POST",
          body: params,
          headers: { Authorization: `Bearer ${token}` },
        };
        return config;
      },
    }),
    postNewUser: build.mutation({
      query: (params) => {
        const token = getAuthTokenFromCookies();
        const config = {
          url: "/api/users",
          method: "POST",
          body: params.newUser,
          headers: { Authorization: `Bearer ${token}` },
        };
        return config;
      },
      invalidatesTags: ["User", "Users"],
    }),
    updateUser: build.mutation({
      query: (params) => {
        console.log("🚀 ~ params-User:", params);
        console.log("🚀 ~ UpdateUser:", getAuthTokenFromCookies());
        const body = {
          name: params.get("name"),
          lastname: params.get("lastname"),
          role: params.get("role"),
          email: params.get("email"),
          address: params.get("address"),
          image: params.get("image"),
        };
        const token = getAuthTokenFromCookies();
        const config = {
          url: `/api/users/${params.get("_id")}`,
          method: "PUT",
          body: body,
          headers: { Authorization: `Bearer ${token}` },
        };
        return config;
      },
      invalidatesTags: ["User", "Users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetReviewQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
  useUpdateReviewMutation,
  useCreateProductMutation,
  useUploadPhotoMutation,
  usePostNewPhotoMutation,
  usePostNewUserMutation,
  useUpdateUserMutation,
  useLoginMutation,
  useDisableProductMutation,
  useDisableUserMutation,
} = api;
