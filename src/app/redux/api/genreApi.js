import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const genreApi = createApi({
    tagTypes: ["Genres"],
    reducerPath: "genres",
    keepUnusedDataFor: 5 * 60,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        fetchAllGenres: builder.query({
            query: () => ({ url: "/genres", method: "GET" }),
            providesTags: ["Genres"]
        }),

        fetchSingleGenre: builder.query({
            query: (id) => ({ url: `/genres/${id}`, method: "GET" })
        })
    })
})

export const { useFetchAllGenresQuery, useFetchSingleGenreQuery } = genreApi
export default genreApi
