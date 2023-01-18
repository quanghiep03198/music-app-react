import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/redux/store";

import "./index.css";
import App from "./App";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	// <React.StrictMode>
	// </React.StrictMode>,
);
