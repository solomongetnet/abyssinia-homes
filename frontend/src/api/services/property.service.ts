import api from "../api";
import { IProperty } from "@/interface/property.interface";
import {
  IPropertiesRes,
  IPropertiesReq,
} from "../interfaces/properties.interface";

const propertyService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<IPropertiesRes, IPropertiesReq>({
      query: ({ page, limit, filtersQuery }) => ({
        url: `/property?limit=${limit}&page=${page}&${new URLSearchParams(
          filtersQuery
        )}`,
        method: "GET",
      }),
      providesTags: ["properties"],
    }),
    getFeatureProperties: builder.query<any[], void>({
      query: () => ({
        url: `/property/features`,
        method: "GET",
      }),
    }),
    getNearbyProperties: builder.query<
      any[],
      { latitude: number; longitude: number; maxDistance?: number }
    >({
      query: ({ latitude, longitude, maxDistance }) => ({
        url: `/property/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`,
        method: "GET",
      }),
    }),
    getSingleProperty: builder.query<IProperty, { propertyId: string }>({
      query: ({ propertyId }) => ({
        url: `/property/single/${propertyId}`,
        method: "GET",
      }),
      providesTags: ["properties"],
    }),
    editProperty: builder.mutation<
      { message: string },
      { data: any; propertyId: string }
    >({
      query: ({ data, propertyId }) => ({
        url: `/property/edit/${propertyId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProperty: builder.mutation<{ message: string }, any>({
      query: (id: any) => ({
        url: `/property/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["my_properties", "properties"],
    }),
    createProperty: builder.mutation<{ message: string }, any>({
      query: (body: any) => ({
        url: "/property",
        method: "POST",
        body,
      }),
      invalidatesTags: ["my_properties", "properties"],
    }),
    getMyProperties: builder.query<IPropertiesRes, IPropertiesReq>({
      query: ({ page, limit }) => ({
        method: "GET",
        url: `/property/my_properties?page=${page}&limit=${limit}`,
      }),
      providesTags: ["my_properties"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetFeaturePropertiesQuery,
  useGetNearbyPropertiesQuery,
  useGetSinglePropertyQuery,
  useCreatePropertyMutation,
  useGetMyPropertiesQuery,
  useEditPropertyMutation,
  useDeletePropertyMutation,
} = propertyService;
