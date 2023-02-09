import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "redux-persist/lib/storage"

import rootReducer from "./rootReducer"
import albumApi from "./services/albumApi"
import artistApi from "./services/artistApi"
import authApi from "./services/authApi"
import collectionApi from "./services/collectionApi"
import genreApi from "./services/genreApi"
import playlistApi from "./services/playlistApi"
import trackApi from "./services/trackApi"

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
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat([
            trackApi.middleware,
            playlistApi.middleware,
            artistApi.middleware,
            albumApi.middleware,
            genreApi.middleware,
            collectionApi.middleware,
            authApi.middleware
        ]),
    devTools: currentEnv.toLowerCase() === "development"
})

// option to use refetchOnMountedOrArgsChange
setupListeners(store.dispatch)

export const persistor = persistStore(store)
export default store
