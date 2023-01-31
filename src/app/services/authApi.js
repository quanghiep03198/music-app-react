import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../axiosBaseQuery"

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        fetchUserData: builder.query({
            query() {
                return { url: "/user", method: "GET" }
            }
        }),
        login: builder.mutation({
            query(credential) {
                return {
                    url: "/login",
                    method: "POST",
                    data: credential
                }
            }
        }),
        refreshToken: builder.query({
            query(credential) {
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
