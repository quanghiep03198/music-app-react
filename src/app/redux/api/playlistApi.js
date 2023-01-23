import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const playlistApi = createApi({
    reducerPath: "playlists",
    tagTypes: ["Playlists", "UserPlaylists"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token
            if (token) headers.set("token", token)
            return headers
        }
    }),
    endpoints: (builder) => {
        return {
            fetchUserPlaylists: builder.query({
                query: ({ userId, skip, limit }) =>
                    `/playlists/created-by/${userId}?skip=${skip}&limit=${limit}`,
                providesTags: ["UserPlaylists"]
            }),
            fetchAllPlaylist: builder.query({
                query: ({ skip = 0, limit }) =>
                    `/playlists?skip=${skip}&limit=${limit}`,
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
