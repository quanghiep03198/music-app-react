import { combineReducers } from "@reduxjs/toolkit";
import artistApi from "./api/artistApi";
import playlistApi from "./api/playlistApi";
import trackApi from "./api/trackApi";
import userSlice from "./slice/userSlice";

const rootReducer = combineReducers({
	tracks: trackApi.reducer,
	playlists: playlistApi.reducer,
	artists: artistApi.reducer,
	user: userSlice.reducer,
});

export default rootReducer;
