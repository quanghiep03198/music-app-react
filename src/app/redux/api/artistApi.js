import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const artistApi = createApi({
    reducerPath: "artists",
    tagTypes: ["Artists"],
    keepUnusedDataFor: 5 * 60,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => {
        return {
            fetchArtists: builder.query({
                query: ({ skip, limit }) => ({
                    url: `/artists?skip=${skip}&limit=${limit}`,
                    method: "GET"
                }),

                providesTags: ["Artists"]
            })
        }
    }
})

export const { useFetchArtistsQuery } = artistApi
export default artistApi
