import { createApi } from "@reduxjs/toolkit/dist/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const albumApi = createApi({
    tagTypes: ["Albums", "UserAlbums"],
    reducerPath: "albums",
    keepUnusedDataFor: 5 * 60,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        fetchAlbums: builder.query({
            query: ({ skip = 0, limit }) => ({
                url: `/albums?skip=${skip}&limit=${limit}`,
                method: "GET"
            }),
            providesTags: ["Albums"]
        }),
        fetchSingleAlbum: builder.query({
            query: (id) => ({ url: `/albums/${id}`, method: "GET" }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            }
        })
    })
})
export const { useFetchAlbumsQuery, useFetchSingleAlbumQuery } = albumApi
export default albumApi
