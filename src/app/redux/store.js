import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import artistApi from "./api/artistApi";
import playlistApi from "./api/playlistApi";
import trackApi from "./api/trackApi";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
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
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([trackApi.middleware, artistApi.middleware, playlistApi.middleware]),
});

export const persistor = persistStore(store);
export default store;
