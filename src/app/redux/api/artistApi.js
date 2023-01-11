import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const artistApi = createApi({
	reducerPath: "Artists",
	tagTypes: ["Artists"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.BASE_URL,
	}),
	endpoints: (builder) => {
		return {
			fetchArtists: builder.query({
				query: () => `/artist`,
				providesTags: ["Artists"],
			}),
		};
	},
});

export const { useFetchArtistsQuery } = artistApi;
export default artistApi;
