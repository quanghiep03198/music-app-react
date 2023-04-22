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
        loginWithEmail: builder.mutation({
            query(payload) {
                return {
                    url: "/auth/login-with-email",
                    method: "POST",
                    data: payload
                }
            },
            invalidatesTags: ["Auth"]
        }),
        refreshToken: builder.query({
            query(uid) {
                if (!uid) return
                return {
                    url: `/refresh-token/${uid}`,
                    method: "GET"
                }
            }
        })
    })
})

export const { useLoginWithEmailMutation, useFetchUserDataQuery, useRefreshTokenQuery } = authApi
export default authApi
