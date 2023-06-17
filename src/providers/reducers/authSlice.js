import { createSlice } from "@reduxjs/toolkit"
import authApi from "../api/authApi"

const initialState = {
   authenticated: false,
   accessToken: null,
   user: null,
   uid: null
}

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      loginWithGoogle(state, { payload }) {
         return payload
      },
      logout(state, { payload }) {
         return initialState
      }
   },
   extraReducers: (builder) => {
      builder.addMatcher(authApi.endpoints.loginWithEmail.matchFulfilled, (state, { payload }) => {
         return payload
      })

      builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
         state.accessToken = payload // set access token to store
      })
      builder.addMatcher(authApi.endpoints.refreshToken.matchRejected, (state, { payload }) => {
         return initialState // logout
      })
   }
})

export const { loginWithGoogle, logout } = authSlice.actions
export default authSlice
