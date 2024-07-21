import api from "../api";
import { IAgentsReq, IAgentsRes } from "../interfaces/agent.interface";

const agentServices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query<IAgentsRes, IAgentsReq>({
      query: ({ page, limit, sort = -1, search }) => ({
        url: `/agent?limit=${limit}&page=${page}&sort=${sort}&search=${search} `,
        method: "GET",
      }),
    }),
    getSingleAgent: builder.query<any, any>({
      query: (agentUsername) => ({
        url: `/agent/single/${agentUsername}`,
        method: "GET",
      }),
    }),
    getRecentAgents: builder.query<any[], { limit?: string | number }>({
      query: ({ limit }) => ({
        url: `/agent/recent?limit=${limit}`,
        method: "GET",
      }),
    }),
    // not used for yet
    getFeatureAgents: builder.query<any[], { limit?: number | number }>({
      query: ({ limit }) => ({
        url: `/agent/feature?limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAgentsQuery,
  useGetSingleAgentQuery,
  useGetRecentAgentsQuery,
  useGetFeatureAgentsQuery,
} = agentServices;
