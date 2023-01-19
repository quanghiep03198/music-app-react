import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/customs/ErrorBoundary";
import Layout from "./components/layouts";

const LoginPage = lazy(() => import("./components/pages/Login"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const RegisterPage = lazy(() => import("./components/pages/Register"));
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"));
const Search = lazy(() => import("./components/pages/Search"));
const HomePage = lazy(() => import("./components/pages/Home"));
const Artist = lazy(() => import("./components/pages/Artist"));
const Library = lazy(() => import("./components/pages/Library"));
const Playlist = lazy(() => import("./components/pages/Playlist"));
const Queue = lazy(() => import("./components/pages/Queue"));

// import HomePage from "./components/pages/Home";
// import Library from "./components/pages/Library";
// import Search from "./components/pages/Search";
// import Queue from "./components/pages/Queue";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />}></Route>
						<Route path="/queue" element={<Queue />} />
						<Route path="/library" element={<Library />}></Route>
						<Route path="playlist/:id" element={<Playlist />} />
						<Route path="artist/:id" element={<Artist />} />
						<Route path="search" element={<Search />}></Route>
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
