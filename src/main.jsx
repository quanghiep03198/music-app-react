import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { persistor } from "./app/redux/store"

import { lazy, StrictMode, Suspense } from "react"
const App = lazy(() => import("./App"))
import "./index.css"
import LoadingScreen from "./components/customs/LoadingScreen"

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Suspense fallback={<LoadingScreen />}>
                    <App />
                </Suspense>
            </PersistGate>
        </Provider>
    </StrictMode>
)
