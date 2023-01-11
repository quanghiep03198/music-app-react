import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const playlistApi = createApi({
	reducerPath: "Artists",
	tagTypes: ["Playlists", "UserPlaylists"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) headers.set("token", token);
			return headers;
		},
	}),
	endpoints: (builder) => {
		return {
			fetchUserPlaylists: builder.query({
				query: (userId) => `/playlist/${userId}`,
				providesTags: ["UserPlaylists"],
			}),
			fetchAllPlaylist: builder.query({
				query: (limit) => `/playlist?limit=${limit}`,
				providesTags: ["Playlists"],
			}),
			addToPlaylist: builder.mutation({
				query: (id, payload) => {
					return {
						url: `/playlist/${id}`,
						method: "PATCH",
						body: payload,
					};
				},
				invalidatesTags: ["UserPlaylists", "Playlists"],
			}),
			updateUserPlaylist: builder.mutation({
				query: (id) => {
					return {
						url: `/playlist`,
					};
				},
			}),
		};
	},
});

export const { useFetchArtistsQuery } = playlistApi;
export default playlistApi;
