import api from "../api";

const favoriteServies = api.injectEndpoints({
  endpoints: (builder) => ({
    addPropertyToFavorite: builder.mutation<
      { message: string },
      { propertyId: string }
    >({
      query: (propertyId) => ({
        method: "PUT",
        url: `/favorite/add/${propertyId}`,
      }),
      invalidatesTags: ["user_account", "my-favorites"],
    }),
    removePropertyFromFavorite: builder.mutation<
      { message: string },
      { propertyId: any }
    >({
      query: (propertyId) => ({
        method: "PUT",
        url: `/favorite/remove/${propertyId}`,
      }),
      invalidatesTags: ["user_account", "my-favorites"],
    }),
    fetchFavoriteProperties: builder.query<any, any>({
      query: ({ limit, page }) => ({
        method: "GET",
        url: `/favorite?limit=${limit}&page=${page}`,
      }),
      providesTags: ["my-favorites"],
    }),
  }),
});

export const {
  useAddPropertyToFavoriteMutation,
  useRemovePropertyFromFavoriteMutation,
  useFetchFavoritePropertiesQuery,
} = favoriteServies;
