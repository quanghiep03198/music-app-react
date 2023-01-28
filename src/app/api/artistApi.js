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
                query: ({ skip, limit }) => ({
                    url: `/artists?skip=${skip}&limit=${limit}`,
                    method: "GET"
                }),
                keepUnusedDataFor: 5 * 60,
                providesTags: ["Artists"]
            })
        }
    }
})

export const { useFetchArtistsQuery } = artistApi
export default artistApi
