import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store, { persistor } from "./app/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import AppProvider from "./components/context/AppProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<AppProvider>
				<App />
			</AppProvider>
		</PersistGate>
	</Provider>,
);
