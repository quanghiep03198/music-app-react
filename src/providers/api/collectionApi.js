import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const collectionApi = createApi({
   tagTypes: ["Collection"],
   baseQuery: axiosBaseQuery(),
   reducerPath: "collectionApi",
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

            providesTags: ["Collection"]
         }),
         updateTrackCollection: builder.mutation({
            query(data) {
               return {
                  url: `/collection/tracks`,
                  method: "PATCH",
                  data
               }
            },

            invalidatesTags: ["Collection"]
         }),
         fetchAlbumsCollection: builder.query({
            query() {
               return {
                  url: "/collection/albums",
                  method: "GET"
               }
            },

            providesTags: ["Collection"]
         }),
         updateAlbumsCollection: builder.mutation({
            query(data) {
               return {
                  url: "/collection/albums",
                  method: "PATCH",
                  data
               }
            },
            invalidatesTags: ["Collection"]
         }),
         fetchArtistsCollection: builder.query({
            query() {
               return {
                  url: "/collection/artists",
                  method: "GET"
               }
            },

            providesTags: ["Collection"]
         }),
         updateArtistsCollection: builder.mutation({
            query(data) {
               return {
                  url: "/collection/artists",
                  method: "PATCH",
                  data
               }
            },
            invalidatesTags: ["Collection"]
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
