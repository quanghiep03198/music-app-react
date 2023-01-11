import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const trackApi = createApi({
	reducerPath: "tracks",
	tagTypes: ["Tracks"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
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

export const { useFetchTracksQuery, useUploadTracksMutation } = trackApi;
export default trackApi;
