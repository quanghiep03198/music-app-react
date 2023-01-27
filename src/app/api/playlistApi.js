import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const playlistApi = createApi({
    reducerPath: "playlists",
    tagTypes: ["Playlists", "UserPlaylists"],
    keepUnusedDataFor: 5 * 60,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => {
        return {
            fetchUserPlaylists: builder.query({
                query: ({ userId, skip, limit }) => ({
                    url: `/playlists/created-by/${userId}?skip=${skip}&limit=${limit}`,
                    method: "GET"
                }),
                providesTags: ["UserPlaylists"]
            }),
            fetchAllPlaylist: builder.query({
                query: ({ skip = 0, limit }) => ({
                    url: `/playlists?skip=${skip}&limit=${limit}`,
                    method: "GET"
                }),
                providesTags: ["Playlists"]
            }),
            fetchSinglePlaylist: builder.query({
                query: (id) => `/playlists/${id}`
            }),
            addToPlaylist: builder.mutation({
                query: (id, payload) => {
                    return {
                        url: `/playlists/${id}`,
                        method: "PATCH",
                        body: payload
                    }
                },
                invalidatesTags: ["UserPlaylists", "Playlists"]
            }),
            updateUserPlaylist: builder.mutation({
                query: (id, payload) => {
                    return {
                        url: `/playlists/${id}`,
                        method: "PATCH",
                        body: payload
                    }
                },
                invalidatesTags: ["UserPlaylists"]
            })
        }
    }
})

export const {
    useFetchSinglePlaylistQuery,
    useFetchAllPlaylistQuery,
    useFetchUserPlaylistsQuery,
    useAddToPlaylistMutation,
    useUpdateUserPlaylistMutation
} = playlistApi
export default playlistApi
