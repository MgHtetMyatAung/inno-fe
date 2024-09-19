import { setTokens } from "../../redux/slices/authSlice";
import { baseApi } from "../config/baseApi";
import { tag_types } from "../tag_types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ phone, password, type }) => ({
        url: `/api/auth/token?type=${type}`,
        method: "GET",
        headers: {
          login: phone,
          password: password,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Assume API response returns accessToken and refreshToken
          dispatch(
            setTokens({
              accessToken: data.access_token[0].token,
            })
          );
        } catch (err) {
          console.error("Login failed", err);
        }
      },
      invalidatesTags: [tag_types.auth],
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [tag_types.auth],
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
      invalidatesTags: [tag_types.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
} = authApi;
