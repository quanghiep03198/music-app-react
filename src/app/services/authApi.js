import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const authApi = createApi({
    tagTypes: ["Auth"],
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        fetchUserData: builder.query({
            query() {
                return { url: "/user", method: "GET" }
            },
            providesTags: ["Auth"]
        }),
        login: builder.mutation({
            query(payload) {
                return {
                    url: "/login",
                    method: "POST",
                    data: payload
                }
            }
        }),
        refreshToken: builder.query({
            query(credential) {
                if (!credential) return
                return {
                    url: `/refresh-token/${credential}`,
                    method: "GET"
                }
            }
        })
    })
})

export const { useLoginMutation, useFetchUserDataQuery, useRefreshTokenQuery } = authApi
export default authApi
