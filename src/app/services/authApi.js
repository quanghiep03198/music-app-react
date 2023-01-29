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
            query(userId) {
                return {
                    url: `/refresh-token/${userId}`,
                    method: "GET"
                }
            }
        })
    })
})

export const { useLoginMutation, useFetchUserDataQuery, useRefreshTokenMutation } = authApi
export default authApi
