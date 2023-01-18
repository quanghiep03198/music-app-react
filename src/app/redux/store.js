import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, KEY_PREFIX } from "redux-persist";

import rootReducer from "./rootReducer";
import artistApi from "./api/artistApi";
import playlistApi from "./api/playlistApi";
import trackApi from "./api/trackApi";
import albumApi from "./api/albumApi";

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const currentEnv = import.meta.env.VITE_NODE_ENV; // get current environment

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, KEY_PREFIX],
			},
		}).concat([trackApi.middleware, playlistApi.middleware, artistApi.middleware, albumApi.middleware]),
	devTools: currentEnv.toLowerCase() === "development",
});

export const persistor = persistStore(store);
export default store;
