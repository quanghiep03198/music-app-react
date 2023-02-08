import authApi from "@/app/services/authApi";
import { logout } from "@/app/slices/authSlice";
import store from "@/app/store";
import axios from "axios";

// config base url for axios globally
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use(
   (config) => {
      /* do not attach token with headers with these routes */
      const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password"];
      if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return config;
      const accessToken = store.getState().auth?.accessToken;
      if (accessToken) {
         config.headers.Authorization = "Bearer " + accessToken;
         return config;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

axios.interceptors.response.use(
   (response) => response.data,
   async (error) => {
      const { response, config } = error;
      const skippingCheckTokenEndpoints = ["/login", "/register", "/refresh-token", "/forgot-password"];
      if (skippingCheckTokenEndpoints.indexOf(config.url) >= 0) return config;

      if ((response?.status === 401, response?.data?.message === "jwt expired")) {
         console.log("[ERROR] Access token expired!");
         const { credential } = store.getState().auth;
         const newAccessToken = await store.dispatch(authApi.endpoints.refreshToken.initiate(credential)).unwrap();
         if (!newAccessToken) {
            store.dispatch(logout());
            return Promise.reject(error);
         }
         console.log("[SUCCESS] Access token expired!", newAccessToken);
         return axios.request(error.config);
      }
      return Promise.reject(error);
   },
);

export default axios;
