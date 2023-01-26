import { combineReducers } from "@reduxjs/toolkit"
import artistApi from "./api/artistApi"
import playlistApi from "./api/playlistApi"
import trackApi from "./api/trackApi"
import queueSlice from "./slice/queueSlice"
import userSlice from "./slice/userSlice"
import albumApi from "./api/albumApi"
import genreApi from "./api/genreApi"

const rootReducer = combineReducers({
    tracks: trackApi.reducer,
    playlists: playlistApi.reducer,
    artists: artistApi.reducer,
    genres: genreApi.reducer,
    auth: userSlice.reducer,
    queue: queueSlice.reducer,
    albums: albumApi.reducer
})

export default rootReducer
