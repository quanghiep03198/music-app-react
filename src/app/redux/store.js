import { configureStore } from "@reduxjs/toolkit"
import {
    FLUSH,
    KEY_PREFIX,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import albumApi from "./api/albumApi"
import artistApi from "./api/artistApi"
import genreApi from "./api/genreApi"
import playlistApi from "./api/playlistApi"
import trackApi from "./api/trackApi"
import rootReducer from "./rootReducer"
import queueSlice from "./slice/queueSlice"

const persistConfig = {
    key: "root",
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const currentEnv = import.meta.env.VITE_NODE_ENV // get current environment

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    KEY_PREFIX
                ]
            }
        }).concat([
            trackApi.middleware,
            playlistApi.middleware,
            artistApi.middleware,
            albumApi.middleware,
            genreApi.middleware
        ])
    // devTools: currentEnv.toLowerCase() === "development"
})

export const persistor = persistStore(store)
export default store
