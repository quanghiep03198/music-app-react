import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const collectionApi = createApi({
    tagTypes: ["TrackCollection", "AlbumCollection", "PlaylistCollection"],
    baseQuery: axiosBaseQuery(),
    reducerPath: "collections",
    refetchOnReconnect: true,
    endpoints(builder) {
        return {
            fetchTrackCollection: builder.query({
                query() {
                    return {
                        url: "/collection/tracks",
                        method: "GET"
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["TrackCollection"]
            })
        }
    }
})

export const { useFetchTrackCollectionQuery } = collectionApi
export default collectionApi
