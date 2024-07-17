import api from "../api";

const profileService = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileAvatar: builder.mutation<{ message: string }, FormData>({
      query: (body: any) => ({
        url: "/profile/avatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user_account"],
    }),
    removeProfileAvatar: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/profile/avatar",
        method: "DELETE",
      }),
      invalidatesTags: ["user_account"],
    }),
    updateProfileInformation: builder.mutation({
      query: (body: any) => ({
        url: "/profile/information",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user_account"],
    }),
    updateProfileEmail: builder.mutation({
      query: (body: any) => ({
        url: "/profile/email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user_account"],
    }),
    updateSocialMedia: builder.mutation({
      query: (body: any) => ({
        url: "/profile/socialMedia",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user_account"],
    }),
  }),
});

export const {
  useUpdateProfileInformationMutation,
  useUpdateProfileEmailMutation,
  useUpdateSocialMediaMutation,
  useUpdateProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} = profileService;
