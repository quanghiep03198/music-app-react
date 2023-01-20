import { lazy, Suspense, useTransition } from "react";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";

import ErrorBoundary from "./components/customs/ErrorBoundary";
import Layout from "./components/layouts";
import Loading from "./components/shared/Atomics/Loading";

import NotFound from "./pages/NotFound";
const Search = lazy(() => import("./pages/Search"));
const HomePage = lazy(() => import("./pages/Home"));
const Artist = lazy(() => import("./pages/Artist"));
const Library = lazy(() => import("./pages/Library"));
const Playlist = lazy(() => import("./pages/Playlist"));
const Queue = lazy(() => import("./pages/Queue"));

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
	const [isPending, startTransition] = useTransition();
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} errorElement={<Loading />} />
						<Route path="/queue" element={<Queue />} errorElement={<Loading />} />
						<Route path="/library" element={<Library />} errorElement={<Loading />} />
						<Route path="/search" element={<Search />} errorElement={<Loading />} />
						<Route path="/playlist/:id" element={<Playlist />} errorElement={<Loading />} />
						<Route path="/artist/:id" element={<Artist />} errorElement={<Loading />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
