import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const trackApi = createApi({
	reducerPath: "tracks",
	tagTypes: ["Tracks", "RelatedTracks", "LikedTracks"],
	// refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
	}),
	endpoints: (builder) => {
		return {
			fetchTracks: builder.query({
				query: ({ skip, limit }) => {
					return `/track?skip=${skip}&limit=${limit}`;
				},
				providesTags: ["Tracks"],
			}),
			fetchRelatedTracks: builder.query({
				query: ({ genre, skip, limit }) => {
					return `/track/related/${genre}?skip=${skip}&limit=${limit}`;
				},

				providesTags: ["RelatedTracks"],
			}),
			uploadTracks: builder.mutation({
				query: (payload) => {
					return {
						url: "/track-upload",
						method: "POST",
						body: payload,
					};
				},
				invalidatesTags: ["Tracks"],
			}),
		};
	},
});

export const { useFetchTracksQuery, useUploadTracksMutation, useFetchRelatedTracksQuery } = trackApi;
export default trackApi;
