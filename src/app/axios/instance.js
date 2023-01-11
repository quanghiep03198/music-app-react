import { setCurrentUser } from "@/app/redux/slice/userSlice";
import store from "@/app/redux/store";
import axios from "axios";

// config axios
const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: { "Content-Type": "application/json" },
});
/* :::::::::::::: Xử  trước khi gửi request xuống server :::::::::::::: */
instance.interceptors.request.use(
	(config) => {
		console.log(import.meta.env.VITE_BASE_URL);
		/* Bỏ qua check access token với các routes nay */
		const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"];
		if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return config;
		/* Trước khi request xuống server gửi luôn access token trong headers để check */
		const accessToken = instance.getAccessToken();
		if (accessToken) {
			config.headers.token = accessToken;
			return config;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/* :::::::::::::: Xử lý data sau khi nhận response :::::::::::::: */
instance.interceptors.response.use(
	async (response) => {
		const { data, config } = response;
		const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"];
		if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return data;

		/* ::::::::::: Refresh token ::::::::::: */

		const userId = localStorage.getItem("auth");
		if (data.status && data.statusCode === 401) {
			const { accessToken } = await instance.get(`/refresh-token/${userId}`); // create new access token
			console.log("New access token :>> ", accessToken);
			instance.setAccessToken(accessToken); // save access token in local storage

			const user = await instance.get("/user"); // get new user data
			store.dispatch(setCurrentUser(user)); // storage in redux
			return await instance.get(config.url); // get other data
		}
		return data;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/* :::::::::::::: Save access token in localstorage :::::::::::::: */
instance.setAccessToken = (accessToken) => {
	if (accessToken) localStorage.setItem("accessToken", accessToken);
};

/* :::::::::::::: Get access token from localstorage :::::::::::::: */
instance.getAccessToken = () => {
	return localStorage.getItem("accessToken");
};

export default instance;
