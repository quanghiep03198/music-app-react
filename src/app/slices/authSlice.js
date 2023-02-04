import { createSlice } from "@reduxjs/toolkit"
import authApi from "../services/authApi"

const initialState = {
    credential: null,
    authenticated: false,
    accessToken: null,
    user: null
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout(state, action) {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.credential = payload.credential
            state.accessToken = payload.accessToken
            state.authenticated = payload.credential !== null && payload.accessToken !== null
        })
        builder.addMatcher(authApi.endpoints.fetchUserData.matchFulfilled, (state, { payload }) => {
            state.user = payload
            state.authenticated = true
        })
        builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload // set access token to store
        })
        builder.addMatcher(authApi.endpoints.refreshToken.matchRejected, (state, { payload }) => {
            return initialState // logout
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice
