import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import artistApi from "./api/artistApi";
import playlistApi from "./api/playlistApi";
import trackApi from "./api/trackApi";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, KEY_PREFIX } from "redux-persist";
const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, KEY_PREFIX],
			},
		}).concat([trackApi.middleware, playlistApi.middleware, artistApi.middleware]),
	devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export const persistor = persistStore(store);
export default store;
