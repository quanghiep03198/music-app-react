import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts";
import Artist from "./components/pages/Artist";
import HomePage from "./components/pages/Home";
import Library from "./components/pages/Library";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Playlist from "./components/pages/Playlist";
import Queue from "./components/pages/Queue";
import Register from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="/playlist/:id" element={<Playlist />} />
					<Route path="/artist/:id" element={<Artist />} />
					<Route path="/library" element={<Library />} />
					<Route path="/queue" element={<Queue />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
