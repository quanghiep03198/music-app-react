import axios from "@/config/axios.config"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import store from "../store"

export const fetchUserThunkAction = createAsyncThunk(
    "user/fetchUser",
    async () => await axios.get("/user")
)

export const loginThunkAction = createAsyncThunk(
    "user/login",
    async (data) => await axios.post("/login", data)
)

export const refreshTokenThunkAction = createAsyncThunk(
    "user/refreshToken",
    async () => {
        const { authId } = store.getState().auth
        if (!authId) {
            return Promise.reject("Invalid auth ID!")
        }
        return await axios.get(`/refresh-token/${authId}`)
    }
)

const initialState = {
    authId: null,
    accessToken: null,
    userInfo: null
}
const userSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserThunkAction.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })
        builder.addCase(loginThunkAction.fulfilled, (state, action) => {
            state.authId = action.payload.id
            state.accessToken = action.payload.accessToken
        })
        builder.addCase(refreshTokenThunkAction.fulfilled, (state, action) => {
            state.accessToken = action.payload
        })
    }
})

export const { logout } = userSlice.actions
export default userSlice
