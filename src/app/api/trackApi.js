import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"
import { setCurrentPlaylist } from "../slices/queueSlice"
import store from "../store"

const trackApi = createApi({
    reducerPath: "tracks",
    tagTypes: ["Tracks", "LikedTracks"],
    refetchOnReconnect: true,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => {
        return {
            fetchTracks: builder.query({
                query({ skip, limit }) {
                    return {
                        url: `/tracks?skip=${skip}&limit=${limit}`,
                        method: "GET"
                    }
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled
                        const { nextup } = store.getState().queue
                        if (nextup.length === 0)
                            dispatch(setCurrentPlaylist({ tracks: data }))
                    } catch (error) {
                        console.log(error.message)
                    }
                },
                keepUnusedDataFor: 5 * 60,
                providesTags: ["Tracks"]
            }),
            fetchRelatedTracks: builder.query({
                query({ genre, skip, limit }) {
                    return {
                        url: `/tracks/related/${genre}?skip=${skip}&limit=${limit}`,
                        method: "GET"
                    }
                },

                // Refetch when the page arg changes
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                }
            }),
            uploadTracks: builder.mutation({
                query(payload) {
                    return {
                        url: "/track-upload",
                        method: "POST",
                        body: payload
                    }
                },
                invalidatesTags: ["Tracks"]
            })
        }
    }
})

export const {
    useFetchTracksQuery,
    useUploadTracksMutation,
    useFetchRelatedTracksQuery
} = trackApi
export default trackApi
