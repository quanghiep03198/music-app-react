import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import artistApi from "./api/artistApi";
import playlistApi from "./api/playlistApi";
import trackApi from "./api/trackApi";
import rootReducer from "./rootReducer";

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat([trackApi.middleware, artistApi.middleware, playlistApi.middleware]);
	},
});

export default store;
