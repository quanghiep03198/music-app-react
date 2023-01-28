import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const artistApi = createApi({
    reducerPath: "artists",
    tagTypes: ["Artists"],
    refetchOnReconnect: true,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => {
        return {
            fetchArtists: builder.query({
                query(query) {
                    return {
                        url: `/artists`,
                        method: "GET",
                        query: query
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["Artists"]
            })
        }
    }
})

export const { useFetchArtistsQuery } = artistApi
export default artistApi
