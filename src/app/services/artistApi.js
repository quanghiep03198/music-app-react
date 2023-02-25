import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const artistApi = createApi({
    reducerPath: "artistApi",
    tagTypes: ["Artists"],
    refetchOnReconnect: true,
    baseQuery: axiosBaseQuery(),
    endpoints(builder) {
        return {
            fetchArtists: builder.query({
                query(params) {
                    return {
                        url: `/artists`,
                        method: "GET",
                        params
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["Artists"]
            }),
            fetchArtist: builder.query({
                query(id) {
                    return {
                        url: `/artists/${id}`,
                        method: "GET"
                    }
                }
            })
        }
    }
})

export const { useFetchArtistsQuery, useFetchArtistQuery } = artistApi
export default artistApi
