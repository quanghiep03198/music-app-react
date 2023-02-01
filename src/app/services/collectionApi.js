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
                providesTags: ["TrackCollection"]
            }),
            updateTrackCollection: builder.mutation({
                query(data) {
                    return {
                        url: `/collection/tracks`,
                        method: "PATCH",
                        data
                    }
                },
                invalidatesTags: ["TrackCollection"]
            })
        }
    }
})

export const { useFetchTrackCollectionQuery, useUpdateTrackCollectionMutation } = collectionApi
export default collectionApi
