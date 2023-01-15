import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const artistApi = createApi({
	reducerPath: "Artists",
	tagTypes: ["Artists"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
	}),
	endpoints: (builder) => {
		return {
			fetchArtists: builder.query({
				query: ({ skip, limit }) => `/artist`,
				providesTags: ["Artists"],
			}),
		};
	},
});

export const { useFetchArtistsQuery } = artistApi;
export default artistApi;
