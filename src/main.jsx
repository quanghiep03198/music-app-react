import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { persistor } from "./redux/store"
import { lazy, Suspense } from "react"
import LazyLoadingScreen from "./components/shared/Loading/LazyLoadingScreen"
import ThemeProvider from "./context/ThemeProvider"
import "./index.css"

import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)
