import { RootState } from "@/store";
import { clearToken, setToken } from "@/store/slices/auth.slices";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "GET",
      },
      api,
      extraOptions
    );

    // Remove accesstoken if there is an error after trying to get new accessToken from refresh token
    if (refreshResult.error?.status === 401) {
      api.dispatch(clearToken());
    } else {
      const { token: newAccessToken } = refreshResult.data as { token: string };
      api.dispatch(setToken(newAccessToken));
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: [
    "user_account",
    "properties",
    "my_properties",
    "my-favorites",
    "users",
  ],
  endpoints: () => ({}),
});
export default api;
