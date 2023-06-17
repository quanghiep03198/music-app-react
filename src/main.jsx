import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"
import store, { persistor } from "./providers/store"
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
         </GoogleOAuthProvider>
      </PersistGate>
   </Provider>
)
