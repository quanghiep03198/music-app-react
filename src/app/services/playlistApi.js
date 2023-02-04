import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"
import qs from "qs"

const playlistApi = createApi({
    reducerPath: "playlists",
    tagTypes: ["Playlists", "UserPlaylists"],
    keepUnusedDataFor: 5 * 60,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => {
        return {
            fetchUserPlaylists: builder.query({
                query({ id, params }) {
                    return {
                        url: `/playlists/created-by/${id}`,
                        method: "GET",
                        params
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["UserPlaylists"]
            }),
            fetchPlaylists: builder.query({
                query(params) {
                    return {
                        url: `/playlists`,
                        method: "GET",
                        params
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["Playlists"]
            }),
            fetchSinglePlaylist: builder.query({
                query(id) {
                    return { url: `/playlists/${id}`, method: "GET" }
                }
            }),
            addToPlaylist: builder.mutation({
                query(id, payload) {
                    return {
                        url: `/playlists/${id}`,
                        method: "PATCH",
                        data: payload
                    }
                },
                invalidatesTags: ["UserPlaylists", "Playlists"]
            }),
            createPlaylist: builder.mutation({
                query(data) {
                    return {
                        url: "/playlists",
                        method: "POST",
                        data
                    }
                },
                invalidatesTags: ["UserPlaylists", "Playlists"]
            }),
            updateUserPlaylist: builder.mutation({
                query(id, data) {
                    return {
                        url: `/playlists/${id}`,
                        method: "PATCH",
                        data
                    }
                },
                invalidatesTags: ["UserPlaylists", "Playlists"]
            }),
            deleteUserPlaylist: builder.mutation({
                query(id) {
                    return {
                        url: `/playlists/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["UserPlaylists", "Playlists"]
            })
        }
    }
})

export const {
    useFetchSinglePlaylistQuery,
    useFetchPlaylistsQuery,
    useFetchUserPlaylistsQuery,
    useCreatePlaylistMutation,
    useUpdateUserPlaylistMutation,
    useAddToPlaylistMutation,
    useDeleteUserPlaylistMutation
} = playlistApi
export default playlistApi
