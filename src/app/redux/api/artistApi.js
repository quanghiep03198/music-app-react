import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const artistApi = createApi({
	reducerPath: "artists",
	tagTypes: ["Artists"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: false,
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
	}),
	endpoints: (builder) => {
		return {
			fetchArtists: builder.query({
				query: ({ skip, limit }) => `/artist?skip=${skip}&limit=${limit}`,
				providesTags: ["Artists"],
			}),
		};
	},
});

export const { useFetchArtistsQuery } = artistApi;
export default artistApi;
