import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const genreApi = createApi({
   tagTypes: ["Genres"],
   reducerPath: "genreApi",
   refetchOnReconnect: true,
   baseQuery: axiosBaseQuery(),
   endpoints: (builder) => ({
      fetchAllGenres: builder.query({
         query() {
            return { url: "/genres", method: "GET" }
         },
         keepUnusedDataFor: 5 * 60,
         providesTags: ["Genres"]
      }),

      fetchSingleGenre: builder.query({
         query(id) {
            return { url: `/genres/${id}`, method: "GET" }
         }
      })
   })
})

export const { useFetchAllGenresQuery, useFetchSingleGenreQuery } = genreApi
export default genreApi
