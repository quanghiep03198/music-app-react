import { combineReducers } from "@reduxjs/toolkit"
import artistApi from "./services/artistApi"
import playlistApi from "./services/playlistApi"
import trackApi from "./services/trackApi"
import queueSlice from "./slices/queueSlice"
import authSlice from "./slices/authSlice"
import albumApi from "./services/albumApi"
import genreApi from "./services/genreApi"
import collectionApi from "./services/collectionApi"
import authApi from "./services/authApi"

const rootReducer = combineReducers({
    tracks: trackApi.reducer,
    playlists: playlistApi.reducer,
    artists: artistApi.reducer,
    collections: collectionApi.reducer,
    genres: genreApi.reducer,
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    queue: queueSlice.reducer,
    albums: albumApi.reducer
})

export default rootReducer
