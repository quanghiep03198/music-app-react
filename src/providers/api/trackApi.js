import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"
import { setCurrentPlaylist } from "../slices/queueSlice"
import store from "../store"

const trackApi = createApi({
   reducerPath: "trackApi",
   tagTypes: ["Tracks", "Collection"],
   // refetchOnReconnect: true,
   baseQuery: axiosBaseQuery(),
   endpoints: (builder) => {
      return {
         fetchTracks: builder.query({
            query(params) {
               return {
                  url: `/tracks`,
                  method: "GET",
                  params
               }
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
               try {
                  const { data } = await queryFulfilled
                  const { nextup } = store.getState().queue
                  if (nextup.length === 0) dispatch(setCurrentPlaylist({ tracks: data }))
               } catch (error) {
                  return
               }
            },

            keepUnusedDataFor: 5 * 60,
            providesTags: ["Tracks"]
         }),
         fetchRelatedTracks: builder.query({
            query({ genre, params }) {
               return {
                  url: `/tracks/related/${genre}`,
                  method: "GET",
                  params
               }
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
               return currentArg !== previousArg
            }
         }),
         fetchTracksUserUploaded: builder.query({
            query() {
               return {
                  url: "/tracks/user-uploaded",
                  method: "GET"
               }
            }
         }),
         createTrack: builder.mutation({
            query(data) {
               return {
                  url: "/tracks",
                  method: "POST",
                  data
               }
            },
            invalidatesTags: ["Tracks", "Collection"]
         })
      }
   }
})

export const { useFetchTracksQuery, useCreateTrackMutation, useFetchRelatedTracksQuery, useFetchTracksUserUploadedQuery } = trackApi
export default trackApi
