import instance from "@/app/axios/instance"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import store from "../store"

export const fetchUserThunkAction = createAsyncThunk(
    "user/fetchUser",
    async () => {
        const user = await instance.get("/user")
        console.log(user)
        return user
    }
)

export const loginThunkAction = createAsyncThunk("user/login", async (data) => {
    return await instance.post("/login", data)
})

export const refreshTokenThunkAction = createAsyncThunk(
    "user/refreshToken",
    async () => {
        const { authId } = store.getState().auth
        if (!authId) {
            console.log("auth id:>>", authId)
            return Promise.reject("Auth ID is invalid!")
        }
        return await instance.get(`/refresh-token/${authId}`)
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
        setCurrentUser: (state, action) => {
            state.userInfo = action.payload
        },
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

export const { setCurrentUser, logout } = userSlice.actions
export default userSlice
