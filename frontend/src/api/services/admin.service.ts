import api from "../api";

const adminService = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdminDashboard: builder.query<
      {
        propertiesCount: number;
        adminsCount: number;
        usersCount: number;
        agentsCount: number;
      },
      void
    >({
      query: () => ({
        method: "GET",
        url: "/admin/dashboard",
      }),
    }),
    fetchAdminPropertiesAnalysis: builder.query<any, void>({
      query: () => ({
        method: "GET",
        url: "/admin/properties_analysis",
      }),
    }),
  }),
});

export const {
  useFetchAdminDashboardQuery,
  useFetchAdminPropertiesAnalysisQuery,
} = adminService;
