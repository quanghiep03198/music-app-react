import axios from "@/config/axios.config"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authApi from "../services/authApi"
import store from "../store"

export const fetchUserThunkAction = createAsyncThunk("user/fetchUser", async () => await axios.get("/user"))

export const loginThunkAction = createAsyncThunk("user/login", async (data) => await axios.post("/login", data))

export const refreshTokenThunkAction = createAsyncThunk("user/refreshToken", async () => {
    const { authId } = store.getState().auth
    if (!authId) {
        return Promise.reject("Invalid auth ID!")
    }
    return await axios.get(`/refresh-token/${authId}`)
})

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
        logout: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken
            state.credential = payload.auth
            state.authenticated = true
        })
        builder.addMatcher(authApi.endpoints.fetchUserData.matchFulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
            state.accessToken = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice
