import { combineReducers } from "@reduxjs/toolkit"
import albumApi from "./api/albumApi"
import artistApi from "./api/artistApi"
import authApi from "./api/authApi"
import collectionApi from "./api/collectionApi"
import genreApi from "./api/genreApi"
import playlistApi from "./api/playlistApi"
import trackApi from "./api/trackApi"
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
