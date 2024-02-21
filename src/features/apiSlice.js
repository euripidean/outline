import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
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
  }),
});

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
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
  }),
});

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  tagTypes: ["Card"],
  endpoints: (builder) => ({
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

// Also create api for tags if there's time.

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectApi;
export const {
  useGetCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardApi;