import { combineReducers } from "@reduxjs/toolkit"
import artistApi from "./api/artistApi"
import playlistApi from "./api/playlistApi"
import trackApi from "./api/trackApi"
import queueSlice from "./slices/queueSlice"
import userSlice from "./slices/userSlice"
import albumApi from "./api/albumApi"
import genreApi from "./api/genreApi"
import collectionApi from "./api/collectionApi"

const rootReducer = combineReducers({
    tracks: trackApi.reducer,
    playlists: playlistApi.reducer,
    artists: artistApi.reducer,
    collections: collectionApi.reducer,
    genres: genreApi.reducer,
    auth: userSlice.reducer,
    queue: queueSlice.reducer,
    albums: albumApi.reducer
})

export default rootReducer
