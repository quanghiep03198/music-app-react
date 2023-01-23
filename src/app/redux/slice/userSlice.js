import instance from "@/app/axios/instance"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const fetchUserThunkAction = createAsyncThunk("user/fetchUser", async () => {
    return await instance.get("/user")
})

const userSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {
        setCurrentUser: (state, action) => {
            state = action.payload
        },
        logout: (state, action) => {
            state = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserThunkAction.fulfilled, (state, action) => {
            state = action.payload
        })
    }
})

export const { setCurrentUser, logout } = userSlice.actions
export default userSlice
