import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const genreApi = createApi({
    tagTypes: ["Genres"],
    reducerPath: "genres",
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL
    }),
    endpoints: (builder) => ({
        fetchAllGenres: builder.query({
            query: () => "/genres",
            providesTags: ["Genres"]
        }),

        fetchSingleGenre: builder.query({
            query: (id) => `/genres/${id}`
        })
    })
})

export const { useFetchAllGenresQuery, useFetchSingleGenreQuery } = genreApi
export default genreApi
