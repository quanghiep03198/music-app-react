import { combineReducers } from "@reduxjs/toolkit"
import albumApi from "./services/albumApi"
import artistApi from "./services/artistApi"
import authApi from "./services/authApi"
import collectionApi from "./services/collectionApi"
import genreApi from "./services/genreApi"
import playlistApi from "./services/playlistApi"
import trackApi from "./services/trackApi"
import authSlice from "./slices/authSlice"
import collectionSlice from "./slices/collectionSlice"
import queueSlice from "./slices/queueSlice"

const rootReducer = combineReducers({
    [trackApi.reducerPath]: trackApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [albumApi.reducerPath]: albumApi.reducer,
    collections: collectionSlice.reducer,
    auth: authSlice.reducer,
    queue: queueSlice.reducer
})

export default rootReducer
