import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  tagTypes: ["User", "Project", "Card"],
  endpoints: (builder) => ({
    // User endpoints
    getUser: builder.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `user`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    // Project endpoints
    getProjects: builder.query({
      query: (userId) => `projects/user/${userId}`,
      providesTags: ["Project"],
    }),
    getProject: builder.query({
      query: (id) => `project/${id}`,
      providesTags: ["Project"],
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: `project`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: (body) => ({
        url: `project`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Project"],
    }),
    // Card endpoints
    getCards: builder.query({
      query: (projectId) => `cards/project/${projectId}`,
      providesTags: ["Card"],
    }),
    getCard: builder.query({
      query: (id) => `card/${id}`,
      providesTags: ["Card"],
    }),
    createCard: builder.mutation({
      query: (body) => ({
        url: `card`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Card"],
    }),
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `card/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Card"],
    }),
    updateCard: builder.mutation({
      query: (body) => ({
        url: `card`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Card"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useGetCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = api;
