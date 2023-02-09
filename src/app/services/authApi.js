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
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            }
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
