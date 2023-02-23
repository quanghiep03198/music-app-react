import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const collectionApi = createApi({
    tagTypes: ["TrackCollection", "AlbumCollection", "ArtistCollection", "Tracks", "Albums", "Artists"],
    baseQuery: axiosBaseQuery(),
    reducerPath: "collections",
    refetchOnReconnect: true,
    keepUnusedDataFor: 5 * 60,
    endpoints(builder) {
        return {
            fetchTrackCollection: builder.query({
                query() {
                    return {
                        url: "/collection/tracks",
                        method: "GET"
                    }
                },

                providesTags: ["TrackCollection", "Tracks"]
            }),
            updateTrackCollection: builder.mutation({
                query(data) {
                    return {
                        url: `/collection/tracks`,
                        method: "PATCH",
                        data
                    }
                },

                invalidatesTags: ["TrackCollection", "Tracks"]
            }),
            fetchAlbumsCollection: builder.query({
                query() {
                    return {
                        url: "/collection/albums",
                        method: "GET"
                    }
                },

                providesTags: ["AlbumCollection", "Albums"]
            }),
            updateAlbumsCollection: builder.mutation({
                query(data) {
                    return {
                        url: "/collection/albums",
                        method: "PATCH",
                        data
                    }
                },
                invalidatesTags: ["AlbumCollection", "Albums"]
            }),
            fetchArtistsCollection: builder.query({
                query() {
                    return {
                        url: "/collection/artists",
                        method: "GET"
                    }
                },

                providesTags: ["ArtistCollection", "Artists"]
            }),
            updateArtistsCollection: builder.mutation({
                query(data) {
                    return {
                        url: "/collection/artists",
                        method: "PATCH",
                        data
                    }
                },
                invalidatesTags: ["ArtistCollection", "Artists"]
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
