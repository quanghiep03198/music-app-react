import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const playlistApi = createApi({
   reducerPath: "playlistApi",
   tagTypes: ["Playlists", "UserPlaylists", "Playlist"],
   refetchOnReconnect: true,
   baseQuery: axiosBaseQuery(),
   endpoints(builder) {
      return {
         fetchUserPlaylists: builder.query({
            query({ id, params }) {
               return {
                  url: `/playlists/created-by/${id}`,
                  method: "GET",
                  params
               }
            },
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
            },
            forceRefetch({ currentArg, previousArg }) {
               return currentArg !== previousArg
            },
            providesTags: (_result, error, id) => (error ? [] : [{ type: "Playlist", id }])
         }),
         editTrackList: builder.mutation({
            query({ id, payload }) {
               return {
                  url: `/playlists/${id}/edit-track-list`,
                  method: "PATCH",
                  data: payload
               }
            },

            invalidatesTags: ["Playlists", "UserPlaylists", "Playlist"]
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
            invalidatesTags: ["UserPlaylists"]
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
   useEditTrackListMutation,
   useDeleteUserPlaylistMutation
} = playlistApi
export default playlistApi
