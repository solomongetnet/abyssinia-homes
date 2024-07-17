import api from "../api.ts";
import { setUser } from "@/store/slices/auth.slices";

const accountServices = api?.injectEndpoints({
  endpoints: (builder) => ({
    fetchMyAccount: builder.query<any, void>({
      query: () => ({
        url: "/account/me",
        method: "GET",
      }),
      providesTags: ["user_account"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        dispatch(setUser({ status: "loading" }));
        queryFulfilled
          .then((res) => {
            dispatch(setUser({ status: "succeeded", data: res.data }));
          })
          .catch(() => {
            dispatch(setUser({ status: "faild", data: null }));
          });
      },
    }),

    changePassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        method: "PUT",
        url: "/account/changePassword",
        body,
      }),
    }),
  }),
});

export const { useLazyFetchMyAccountQuery, useChangePasswordMutation } =
  accountServices;
