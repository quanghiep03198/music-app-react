import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const albumApi = createApi({
	tagTypes: ["Albums", "UserAlbums"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	reducerPath: "albums",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth?.token;
			if (token) {
				headers.set("token", token);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		fetchAlbums: builder.query({
			query: ({ skip = 0, limit }) => {
				return `/album?skip=${skip}&limit=${limit}`;
			},
			providesTags: ["Albums"],
		}),
	}),
});

export const { useFetchAlbumsQuery } = albumApi;
export default albumApi;