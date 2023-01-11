import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./app/redux/store";

import { Provider } from "react-redux";
import AppProvider from "./components/context/AppProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<AppProvider>
			<App />
		</AppProvider>
	</Provider>,
);
