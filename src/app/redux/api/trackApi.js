import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { addToQueue, setCurrentPlaylist } from "../slice/queueSlice"
import store from "../store"

const trackApi = createApi({
    reducerPath: "tracks",
    tagTypes: ["Tracks", "LikedTracks"],
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL
    }),
    endpoints: (builder) => {
        return {
            fetchTracks: builder.query({
                query: ({ skip, limit }) => {
                    return `/tracks?skip=${skip}&limit=${limit}`
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
                providesTags: ["Tracks"]
            }),
            fetchRelatedTracks: builder.query({
                query: ({ genre, skip, limit }) => {
                    return `/tracks/related/${genre}?skip=${skip}&limit=${limit}`
                },

                // Refetch when the page arg changes
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                }
            }),
            uploadTracks: builder.mutation({
                query: (payload) => {
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
