import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const collectionApi = createApi({
    tagTypes: ["TrackCollection", "AlbumCollection", "PlaylistCollection"],
    baseQuery: axiosBaseQuery(),
    reducerPath: "collections",
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
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
            }),
            fetchAlbumsCollection: builder.query({
                query() {
                    return {
                        url: "/collection/albums",
                        method: "GET"
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["AlbumCollection"]
            }),
            updateAlbumsCollection: builder.mutation({
                query(data) {
                    return {
                        url: "/collection/albums",
                        method: "PATCH",
                        data
                    }
                },
                invalidatesTags: ["AlbumCollection"]
            }),
            fetchArtistsCollection: builder.query({
                query() {
                    return {
                        url: "/collection/artists",
                        method: "GET"
                    }
                },

                keepUnusedDataFor: 5 * 60,
                providesTags: ["AlbumCollection"]
            }),
            updateArtistsCollection: builder.mutation({
                query(data) {
                    return {
                        url: "/collection/artists",
                        method: "PATCH",
                        data
                    }
                },
                invalidatesTags: ["AlbumCollection"]
            })
        }
    }
})

export const {
    useFetchTrackCollectionQuery,
    useUpdateTrackCollectionMutation,
    useFetchAlbumsCollectionQuery,
    useUpdateAlbumsCollectionMutation,
    useFetchArtistsCollectionQuery,
    useUpdateArtistsCollectionMutation
} = collectionApi
export default collectionApi
