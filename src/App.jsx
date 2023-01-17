import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts";
import { lazy } from "react";
const Artist = lazy(() => import("./components/pages/Artist"));
const HomePage = lazy(() => import("./components/pages/Home"));
const Library = lazy(() => import("./components/pages/Library"));
const Login = lazy(() => import("./components/pages/Login"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const Playlist = lazy(() => import("./components/pages/Playlist"));
const Queue = lazy(() => import("./components/pages/Queue"));
const Register = lazy(() => import("./components/pages/Register"));
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} loader />
					<Route path="/playlist/:id" element={<Playlist />} />
					<Route path="/artist/:id" element={<Artist />} />
					<Route path="/library" element={<Library />} />
					<Route path="/queue" element={<Queue />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
