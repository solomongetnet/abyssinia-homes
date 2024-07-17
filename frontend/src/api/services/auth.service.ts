import api from "../api";
import { clearToken, setToken } from "@/store/slices/auth.slices";
import { ILoginReq, ISignupReq } from "../interfaces/auth.interfaces";

const authServices = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; message: string }, ILoginReq>({
      query: (credential: any) => ({
        url: "/auth/login",
        method: "POST",
        body: credential,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then((res) => {
            dispatch(setToken(res.data.token));
          })
          .catch(() => {
            dispatch(clearToken());
          });
      },
    }),
    signup: builder.mutation<any, ISignupReq>({
      query: (credential: any) => ({
        url: "/auth/signup",
        method: "POST",
        body: credential,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<
      { message: string },
      { newPassword: string; resetToken: string }
    >({
      query: ({ newPassword, resetToken }) => ({
        url: `/auth/reset-password/${resetToken}`,
        method: "POST",
        body: { newPassword },
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(clearToken());
          })
          .catch(() => {
            console.log("Error occured when logging out");
          });
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authServices;
