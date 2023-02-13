import { createApi } from "@reduxjs/toolkit/dist/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const albumApi = createApi({
    tagTypes: ["Albums", "UserAlbums"],
    reducerPath: "albums",
    refetchOnReconnect: true,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        fetchAlbums: builder.query({
            query(params) {
                return {
                    url: `/albums`,
                    method: "GET",
                    params
                }
            },

            keepUnusedDataFor: 5 * 60,
            providesTags: ["Albums"]
        }),
        fetchSingleAlbum: builder.query({
            query(id) {
                return { url: `/albums/${id}`, method: "GET" }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            }
        })
    })
})
export const { useFetchAlbumsQuery, useFetchSingleAlbumQuery } = albumApi
export default albumApi
