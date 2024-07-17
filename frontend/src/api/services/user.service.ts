import { IUser } from "@/interface/user.interface";
import api from "../api";
import {
  IUserDashboardRes,
  IUserPropertiesAnalysisRes,
} from "../interfaces/user.interfaces";

const userSerivce = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<
      {
        users: IUser[];
        totalPages: number;
        currentPage: number;
        totalCount: number;
      },
      {
        page?: number;
        limit?: number;
      }
    >({
      query: ({ limit, page }) => ({
        method: "GET",
        url: `/user?limit=${limit}&page=${page}`,
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation<{ message: string }, { userId: any }>({
      query: ({ userId }) => ({
        method: "DELETE",
        url: `/user/${userId}`,
      }),
      invalidatesTags: ["users"],
    }),
    fetchUserDashboard: builder.query<IUserDashboardRes, void>({
      query: () => ({
        method: "GET",
        url: "/user/dashboard",
      }),
    }),
    fetchPropertiesAnalysis: builder.query<IUserPropertiesAnalysisRes, void>({
      query: () => ({
        method: "GET",
        url: "/user/properties_analysis",
      }),
    }),
  }),
});

export const {
  useFetchUserDashboardQuery,
  useFetchPropertiesAnalysisQuery,
  useFetchUsersQuery,
  useDeleteUserMutation,
} = userSerivce;
