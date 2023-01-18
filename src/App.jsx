import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts";
import Search from "./components/pages/Search";

import LoginPage from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import RegisterPage from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";
import ErrorBoundary from "./components/customs/ErrorBoundary";
// import HomePage from "./components/pages/Home";

const HomePage = lazy(() => import("./components/pages/Home"));
const Artist = lazy(() => import("./components/pages/Artist"));
const Library = lazy(() => import("./components/pages/Library"));
const Playlist = lazy(() => import("./components/pages/Playlist"));
const Queue = lazy(() => import("./components/pages/Queue"));

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/playlist/:id" element={<Playlist />} />
						<Route path="/artist/:id" element={<Artist />} />
						<Route path="/library" element={<Library />} />
						<Route path="/queue" element={<Queue />} />
						<Route path="/search" element={<Search />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
